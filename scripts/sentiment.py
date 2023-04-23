from nltk.sentiment.vader import SentimentIntensityAnalyzer


vader = SentimentIntensityAnalyzer()

sample = 'I really love NVIDIA'

print(vader.polarity_scores(sample))