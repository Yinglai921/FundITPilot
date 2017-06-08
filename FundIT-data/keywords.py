import json

json_data=open('data.json').read()

data = json.loads(json_data)


totalKeywords = []

for i in list(range(len(data))):
    for j in list(range(len(data[i]['keywords']))):
        totalKeywords.append(data[i]['keywords'][j])



with open('keywords.json', 'w') as f:
    json.dump(totalKeywords, f)