from fastapi import APIRouter
from transformers import pipeline
from deep_translator import GoogleTranslator
import json

api = APIRouter()

sentiment_analysis = pipeline("sentiment-analysis")

with open("powerline/helplines.json") as json_file:
    helplines = json.load(json_file)


@api.get("/")
async def send_message(message, country_code):
    message = GoogleTranslator(source="auto", target="en").translate(message)
    prediction = sentiment_analysis(message)
    helpline = ""
    if prediction[0]["label"] == "POSITIVE":
        return {"label": prediction[0], "helpline": None}
    else:
        for country in helplines["data"]:
            if country["country"] == country_code:
                helpline = {"phone": country["phone"],
                            "hotline": country["hotline"]}
        if helpline == "":
            helpline = {"phone": helplines["data"][0]["phone"],
                        "hotline": helplines["data"][0]["hotline"]}
        return {"label": prediction[0], "helpline": helpline}
