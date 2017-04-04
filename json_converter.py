import pandas as pd
from flask import Flask, render_template


def convert_questions_to_json():
    json_values = quiz_data.to_json(orient='records')

    with open('static/questionsjson/questions_json.json', 'w') as f:
        f.write(json_values)


if __name__ == "__main__":
    quiz_data = pd.read_csv("Question Set.csv", header=0, index_col=0)
    convert_questions_to_json()