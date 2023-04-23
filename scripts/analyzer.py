from nltk.sentiment.vader import SentimentIntensityAnalyzer

sia = SentimentIntensityAnalyzer()

file = open("infosys_reviews.txt", "r")

review_list = file.read().split("\n")

neg = 0
pos=0
neu=0

for review in review_list:
    sentiment = sia.polarity_scores(review)
    max_val = max(sentiment["neg"],sentiment["pos"],sentiment["neu"])
    if(sentiment["pos"] == max_val):
        pos += 1
    elif(sentiment["neg"] == max_val):
        neg+=1
    else:
        neu+=1

# print(((pos)/pos+neg+neu))
print((pos/500)*100)
print((neg/500)*100)
print((pos/500)*100)