import hashlib as hl
import redis
from flask import Flask, request, jsonify, abort, redirect
from flask_cors import CORS

app= Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
# url = input("Enter the URL: ")

url_table = {}
table_size = 1000
hash_value = -1

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

#Generates hashcode for shortend URLs
def hash_function(url):
    url=url.encode('utf-8')
    return hl.shake_128(url).hexdigest(6)

@app.route('/', methods=['GET'])
def hi_there():
    return "Welcome to URL Shortner!"

@app.route('/generate', methods=['POST'])
def generate_short():
    url = request.json["url"]
    if(len(url)!=0):

        hash_value=hash_function(url)

        # temp_result = r.scan(0, hash_value)
        # print(str(type(temp_result)) + str(temp_result[1]))

        # key_list = temp_result[1]
        
        # if len(key_list) == 0:
        res = r.set(hash_value, url, nx=True)
        print(res)
        exist=False
        while res is None:
            check_code = r.get(hash_value)

            if url == check_code:
                print('Short Url already exists! ' + hash_value)
                exist=True
                break

            else:
                hash_value=hash_function((str(url)+str(hash_value)))
                res = r.set(hash_value, url, nx=True)
                #Tommorow's work if the hashcode already exist then check the URL value if URL value is also same then inform that short URL already exist.

        url_json = {}
        hostname = get_hostname(request)
        if exist:
            url_json["key"] = hash_value
            url_json["long_url"] = url
            url_json["short_url"] = hostname + hash_value
            return error_handling(f'Short URL already exist {url_json["short_url"]}',409)
        
        else:
            url_json["key"] = hash_value
            url_json["long_url"] = url
            url_json["short_url"] = hostname + hash_value

        url_json_data = jsonify(url_json)
        print(url_json_data)
        return url_json_data

    else:
        print("No URL was entered.")
        return error_handling("Bad request. No URL was entered.",400)

@app.route('/<string:url_code>')
def redirect_page(url_code):
    result = r.get(url_code)

    if(result is not None):
        return redirect(result)

    else:
        print(f'No URL found with this code: {url_code}')
        return error_handling(f'No URL found with this code: {url_code}',404)


@app.route('/retrieve', methods=['GET'])
def retrieve_url():
    
    if 'code' in request.args:
        hashcode = request.args.get('code')
        url_json = {}
        result = r.get(hashcode)
    else:
        return error_handling("Bad request. No short url provided. code parameter missing.",400)

    if(result is not None):
        hostname = get_hostname(request)
        url_json["key"] = hashcode
        url_json["long_url"] = result
        url_json["short_url"] = hostname + hashcode

        url_json_data = jsonify(url_json)
        return url_json_data
    else:
        print(f'No URL found with this code: {hashcode}')
        return error_handling(f'No URL found with this code: {hashcode}',404)

@app.route('/delete/<string:url_code>', methods=['DELETE'])
def delete_shorturl(url_code):

    result = r.get(url_code)

    if result is None:
        print(f'No URL found with this code: {url_code}')
        return error_handling(f'No URL found with this code: {url_code}',404)
    else:
        r.delete(url_code)

        response = jsonify({'message':'short_url deleted successfully.'})
        response.status_code = 200
        return response



#generate_short(url)
def error_handling(message,code):
    error_message = message
    status_code = code

    response = jsonify({'error':error_message})
    response.status_code = status_code
    return response

def get_hostname(request):
    hostname = request.host
    return hostname + '/'

if __name__ == '__main__':
    app.run(debug=True)