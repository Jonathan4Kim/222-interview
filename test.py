import json

with open('data.json', 'r') as file:
    data = json.load(file)


inner_list = data[0]['members']

temp = {}

for member in inner_list:
    temp[member['name']] = member

for k, v in temp.items():
    print(k)
    print(v)
    print('next')