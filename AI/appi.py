# from flask import Flask, request, jsonify
# import pandas as pd
# import pickle
# import shap
# import dice_ml
# import warnings
# import numpy as np

# warnings.filterwarnings("ignore")
# app = Flask(__name__)

# # Load model
# with open("model.pkl", "rb") as f:
#     model = pickle.load(f)

# # Training data (same as used in retraining)
# df_train = pd.read_csv("data/convertcsv.csv")

# # Features used in training
# features = ['annualIncome', 'hasForeignIncome', 'isGstRegistered', 'has80CInvestments',
#             'investment80CAmount', 'healthInsurancePremium', 'homeLoanInterest', 'educationLoanInterest']

# target_col = 'tax_liability'
# if target_col not in df_train.columns:
#     df_train[target_col] = (
#         0.2 * df_train["annualIncome"] -
#         0.1 * df_train["investment80CAmount"] -
#         0.05 * df_train["homeLoanInterest"] -
#         0.03 * df_train["healthInsurancePremium"]
#     ).clip(lower=0)

# explainer = shap.Explainer(model.predict, df_train[features])

# @app.route("/predict", methods=["POST"])
# def predict_tax():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file uploaded."}), 400

#     user_file = request.files['file']
#     user_df = pd.read_csv(user_file)

#     if not set(features).issubset(user_df.columns):
#         return jsonify({"error": "Missing required features in uploaded CSV."}), 400

#     user_input = user_df[features].iloc[0:1]

#     prediction = model.predict(user_input)[0]
#     result = {
#         "estimated_tax": round(prediction),
#         "eli5_summary": [],
#         "what_if": []
#     }

#     # SHAP explanation
#     shap_vals = explainer(user_input)
#     for val, col in zip(shap_vals.values[0], features):
#         impact = round(val)
#         if impact > 0:
#             msg = f"🔺 Because of high '{col}', your tax increased by ~₹{impact}"
#         else:
#             msg = f"🟢 '{col}' helped reduce your tax by ~₹{abs(impact)}"
#         result["eli5_summary"].append(msg)

#     # DiCE What-If
#     dice_data = dice_ml.Data(dataframe=df_train, continuous_features=features, outcome_name=target_col)
#     dice_model = dice_ml.Model(model=model, backend="sklearn", model_type="regressor")
#     exp = dice_ml.Dice(dice_data, dice_model)
#     dice_exp = exp.generate_counterfactuals(user_input, total_CFs=1, desired_range=[0, prediction * 0.8])
#     cf = dice_exp.cf_examples_list[0].final_cfs_df[features]
#     cf_vals = cf.iloc[0]
#     user_vals = user_input.iloc[0]

#     for col in features:
#         if user_vals[col] != cf_vals[col]:
#             result["what_if"].append(f"➡️ Change '{col}' from {user_vals[col]} to {cf_vals[col]}")

#     new_pred = model.predict(cf)[0]
#     result["what_if"].append(f"✅ After applying changes, tax could reduce to ₹{round(new_pred)} (from ₹{round(prediction)})")

#     return jsonify(result)

# if __name__ == "__main__":
#     app.run(debug=True)



# from flask import Flask, request, jsonify
# import joblib
# import numpy as np

# app = Flask(__name__)

# # Load your trained model
# model = joblib.load("tax_model.pkl")

# @app.route('/')
# def home():
#     return "AI Tax Prediction API is running!"

# @app.route('/predict', methods=['POST'])
# def predict():
#     data = request.get_json(force=True)

#     try:
#         # Extract input values
#         mobile = data['mobileNumber']
#         annual_income = data['annualIncome']
#         inv_80c = data['investment80CAmount']
#         health_insurance = data['healthInsurancePremium']
#         home_loan_interest = data['homeLoanInterest']
#         edu_loan_interest = data['educationLoanInterest']
#         form16_file = data['form16File']
#         pan_file = data['panCardFile']
#         additional_docs = data['additionalDocuments']

#         # Prepare data for prediction
#         input_data = np.array([[annual_income, inv_80c, health_insurance, home_loan_interest,
#                                 edu_loan_interest, form16_file, pan_file, additional_docs]])

#         # Make prediction
#         predicted_tax = model.predict(input_data)[0]

#         # Generate explanation
#         response_text = (
#             f"Hello! Based on the financial data you provided:\n"
#             f"- Your annual income is ₹{annual_income:,.2f}.\n"
#             f"- You have invested ₹{inv_80c:,.2f} under Section 80C.\n"
#             f"- Your health insurance premium amounts to ₹{health_insurance:,.2f}.\n"
#             f"- You're paying ₹{home_loan_interest:,.2f} as interest on your home loan.\n"
#             f"- Your education loan interest is ₹{edu_loan_interest:,.2f}.\n\n"
#             f"Taking into account the deductions and documents you've submitted, "
#             f"our AI-based model has estimated your **tax liability** to be approximately ₹{predicted_tax:,.2f}.\n\n"
#             f"Note: This is a machine-generated estimate based on patterns in financial data. "
#             f"For final filing, always consult a tax expert or refer to government guidelines."
#         )

#         return jsonify({
#             "mobileNumber": mobile,
#             "predicted_tax_liability": predicted_tax,
#             "detailed_explanation": response_text
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)})

# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask, request, jsonify
import numpy as np
import pickle

app = Flask(__name__)

# Load the trained model
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/')
def index():
    return "🚀 Tax Estimation API is up and running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        required_keys = [
            'annualIncome',
            'investment80CAmount',
            'healthInsurancePremium',
            'homeLoanInterest',
            'educationLoanInterest',
            'donationAmount',
            'parentsMedicalPremium',
            'npsInvestment'
        ]

        # Check if all keys are present
        if not all(key in data for key in required_keys):
            return jsonify({'error': 'Missing one or more required fields.'}), 400

        # Extract and convert to float
        features = [float(data[key]) for key in required_keys]
        features_np = np.array([features])  # Shape (1, 8)

        # Prediction
        prediction = model.predict(features_np)[0]

        # Explanation
        explanation = (
            f"📊 Based on the provided values:\n\n"
            f"- Annual Income: ₹{data['annualIncome']:,}\n"
            f"- Investment under 80C: ₹{data['investment80CAmount']:,}\n"
            f"- Health Insurance Premium: ₹{data['healthInsurancePremium']:,}\n"
            f"- Home Loan Interest: ₹{data['homeLoanInterest']:,}\n"
            f"- Education Loan Interest: ₹{data['educationLoanInterest']:,}\n"
            f"- Donations: ₹{data['donationAmount']:,}\n"
            f"- Parents' Medical Premium: ₹{data['parentsMedicalPremium']:,}\n"
            f"- NPS Investment: ₹{data['npsInvestment']:,}\n\n"
            f"💡 Your estimated tax deduction/benefit is: ₹{prediction:,.2f}."
        )

        return jsonify({
            'prediction': round(prediction, 2),
            'explanation': explanation
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
