from flask import Flask, jsonify, request
from flask_cors import CORS
from dataScienceComponent import Prediction
app = application = Flask(__name__)
CORS(app)
main = Prediction()



@app.route("/sendCsvData", methods=["POST"])
def sendCSV():
    data = request.get_json()
    print("CSV Data Received")
    listOfRecords = []
    for record in data:
        line = []  # Date , store , item , sales
        line.append(record["date"])
        line.append(int(record["store"]))
        line.append(int(record["item"]))
        line.append(int(record["sales"]))
        listOfRecords.append(line)
    main.addData(listOfRecords)
    return jsonify("CSV Sent")


@app.route("/getPredData", methods=["GET"])
def getPredData():
    amounts = main.getPredictionAmounts()
    dates = main.getPredictionDates()

    predicionDictList = []
    for x in range(len(amounts)):
        pair = {
            "date" : dates[x],
            "amount" : amounts[x]
        }
        predicionDictList.append(pair)
    return jsonify(predicionDictList)





if __name__ == '__main__':
    app.run(debug=True)
