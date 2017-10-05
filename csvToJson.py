# Code courtesy: https://stackoverflow.com/questions/19697846/python-csv-to-json
import csv, os
import json
import sys
# from textblob import TextBlob

path=r"hate crime index data/"


keywordsList=[];
jsonKW=[];
with open(path+'May.csv') as fin:
    csvin = csv.reader(fin)
    header = next(csvin, [])
    json.dump(dict(zip(header, zip(*csvin))),open("May.json","w"),indent=4)

jsonfile=open("May.json","r")


with jsonfile as data_file:
    data = json.load(data_file)
    for i in range(len(data["Keywords"])):
        keywords=data["Keywords"][i].split()
        #if Keywords in csv have the same ones, reduce redundancy
        wordsPerLine=[]
        for word in keywords:
            if word not in wordsPerLine:
                wordsPerLine.append(word)
                if word not in keywordsList:
                    keywordsList.append(word)
                    newWord={}
                    newWord["word"]=word
                    newWord["titles"]=[]
                    newWord["titles"].append(data["Article Title"][i])
                    newWord["urls"]=[]
                    newWord["urls"].append(data["URL"][i])
                    newWord["dates"]=[]
                    newWord["dates"].append(data["Article Date"][i])
                    jsonKW.append(newWord)
                else:
                    wordIndex=keywordsList.index(word)
                    jsonKW[wordIndex]["titles"].append(data["Article Title"][i])
                    jsonKW[wordIndex]["urls"].append(data["URL"][i])
                    jsonKW[wordIndex]["dates"].append(data["Article Date"][i])
            else:
                continue

#remove the word from the cloud if frequency is too low
newJson=[]
newJson = [x for x in jsonKW if len(x["dates"])>=5 ]
for element in newJson:
    element["count"]=len(element["dates"])

print len(newJson)


with open('MayKW.json', 'w') as fout:
    json.dump(newJson, fout,indent=4)
