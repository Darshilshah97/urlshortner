import hashlib as hl
import redis
import json

url = input("Enter the URL: ")

url_table = {}
table_size = 1000
hash_value = -1

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

#Generates hashcode for shortend URLs
def hash_function(url):
    url=url.encode('utf-8')
    return hl.shake_128(url).hexdigest(6)

def generate_short(url):
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
        if exist:
            url_json["key"] = hash_value
            url_json["long_url"] = url
            url_json["short_url"] = r.get(hash_value)
        else:
            url_json["key"] = hash_value
            url_json["long_url"] = url
            url_json["short_url"] = "https://localhost/" + hash_value

        url_json_data = json.dumps(url_json)
        print(url_json_data)

    else:
        print("No URL was entered.")

def retrieve_url(hashcode):
    
    url_json = {}
    result = r.get(hashcode)

    if(result is not None):
        url_json["key"] = hashcode
        url_json["long_url"] = result
        url_json["short_url"] = "https://localhost/" + hashcode

        url_json_data = json.dumps(url_json)
        return url_json_data
    else:
        return "invalid value"

generate_short(url)


urlcode = input("Enter URL code: ")

result = retrieve_url(urlcode)
print(result)