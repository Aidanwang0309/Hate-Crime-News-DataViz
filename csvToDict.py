import csv
import sys
from textblob import TextBlob

# def csv_dict(file_name):
#     with open("Feb.csv",'rb') as csvfile:
#         reader = csv.DictReader(csvfile)
#         dict_list=[]
#         for row in reader:
#             print(row['City'])
#
# csv_dict(sys.argv[1])

toCSV = [{'name':'bob','age':[25,40],'weight':[200,100]},
         {'name':'bob','age':31,'weight':180}]
keys = toCSV[0].keys()
with open('people.csv', 'wb') as output_file:
    dict_writer = csv.DictWriter(output_file, keys)
    dict_writer.writeheader()
    dict_writer.writerows(toCSV)
