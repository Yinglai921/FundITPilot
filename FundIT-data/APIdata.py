import urllib2
import json


#load all the topic data from API
req = urllib2.Request("http://ec.europa.eu/research/participants/portal/data/call/h2020/h2020_topics.json")
opener = urllib2.build_opener()
f = opener.open(req)
JSON = json.loads(f.read())

# extract 200 lines and adapt to our own data structure 
data = []
for i in list(range(len(JSON["topicData"]["Topics"]))):
    topic = {
        "title": " ",
        "identifier": " ",
        "desc": " ",
        "keywords": " ",
        "tags": " ",
        "flags": " ",
        "callStatus": " ",
        "plannedOpeningDate": " ",
        "deadlineDates": " ",
        "url": " "
    }
    JSON_topic = JSON["topicData"]["Topics"][i]

    # these keys should have
    title = JSON_topic["title"]
    identifier = JSON_topic["identifier"].lower()
    callStatus = JSON_topic["callStatus"]
    plannedOpeningDate = JSON_topic["plannedOpeningDate"]
    deadlineDates = JSON_topic["deadlineDates"]
    url = "http://ec.europa.eu/research/participants/portal4/desktop/en/opportunities/h2020/topics/" + identifier + ".html"

    # these keys may not exist
    keywords_key = "keywords"
    keywords = " "
    if keywords_key in JSON_topic:
        keywords = JSON_topic["keywords"]
    flags_key = "flags"
    flags = " "
    if flags_key in JSON_topic:
        flags = JSON_topic["flags"]
    tags_key = "tags"
    tags = " "
    if tags_key in JSON_topic:
        tags = JSON_topic["tags"]


    # get the description from API

    try: 
        urllib2.urlopen("http://ec.europa.eu/research/participants/portal/data/call/topics/" + identifier + ".json")
    except urllib2.HTTPError as err:
        if err.code == 404:
            print "404"
        else:
            raise
    else:
        req_desc = urllib2.Request("http://ec.europa.eu/research/participants/portal/data/call/topics/" + identifier + ".json")
        f_desc = opener.open(req_desc)
        JSON_desc = json.loads(f_desc.read())
        desc = JSON_desc["description"]
        topic["desc"] = desc

    # end of get the description from API

    topic["title"] = title
    topic["identifier"] = identifier
    topic["keywords"] = keywords
    topic["flags"] = flags
    topic["tags"] = tags
    topic["callStatus"] = callStatus
    topic["plannedOpeningDate"] = plannedOpeningDate
    topic["deadlineDates"] = deadlineDates
    topic["url"] = url
    data.append(topic)

with open('data.json', 'w') as outfile:
    json.dump(data, outfile)