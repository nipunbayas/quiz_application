import pandas as pd
from flask import Flask, render_template


def convert_questions_to_json():
    # quiz_data.columns = list(quiz_data.index.values)
    # print mds_values

    json_values = quiz_data.to_json(orient='records')

    with open('static/questionsjson/questions_json.json', 'w') as f:
        f.write(json_values)

app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html')


if __name__ == "__main__":
    quiz_data = pd.read_csv("Question Set.csv", header=0, index_col=0)
    convert_questions_to_json()

    app.run(host='0.0.0.0', port=8086, debug=True)