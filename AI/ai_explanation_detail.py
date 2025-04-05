import pandas as pd
import numpy as np
import joblib
import shap
import dice_ml
from dice_ml.utils import helpers
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder

# Load dataset
df = pd.read_csv("data/convertcsv.csv")
target_col = "tax_liability"

if target_col not in df.columns:
    print("⚠️ 'tax_liability' column not found. Generating dummy values for now.")
    df[target_col] = np.random.randint(5000, 50000, size=len(df))

# Define features
features = ['employmentType', 'annualIncome', 'hasForeignIncome', 'isGstRegistered',
            'has80CInvestments', 'investment80CAmount', 'healthInsurancePremium',
            'homeLoanInterest', 'educationLoanInterest']
df = df[features + [target_col]].copy()

# Convert binary features to int (if they are bool or string)
binary_cols = ['hasForeignIncome', 'isGstRegistered', 'has80CInvestments']
for col in binary_cols:
    df[col] = df[col].astype(str).map({'True': 1, 'False': 0, 'Yes': 1, 'No': 0, '1': 1, '0': 0}).fillna(0).astype(int)

# Encode employmentType
df['employmentType'] = LabelEncoder().fit_transform(df['employmentType'].astype(str))

# Drop nulls
df.dropna(inplace=True)

X = df[features]
y = df[target_col]

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X, y)
joblib.dump(model, 'model.pkl')
print("✅ Model trained and saved as 'model.pkl'")

# Select one input row
user_input = X.iloc[[0]]
user_true_output = model.predict(user_input)[0]

# ------------------- SHAP ELI5 STYLE -------------------
explainer = shap.TreeExplainer(model)
shap_vals = explainer.shap_values(user_input)
contrib_dict = dict(zip(X.columns, shap_vals[0]))

sorted_contrib = sorted(contrib_dict.items(), key=lambda x: abs(x[1]), reverse=True)

print("\n📝 ELI5 Tax Summary:")
print(f"Estimated Tax Liability: ₹{user_true_output:.0f}")
for feature, impact in sorted_contrib[:4]:
    if impact > 0:
        print(f"🔺 Because of high '{feature}', your tax increased by ~₹{abs(impact):.0f}")
    else:
        print(f"🟢 '{feature}' helped reduce your tax by ~₹{abs(impact):.0f}")

# ------------------- DiCE WHAT-IF ANALYSIS -------------------
# ------------------- DiCE WHAT-IF ANALYSIS -------------------
dice_data = dice_ml.Data(dataframe=df, continuous_features=features, outcome_name=target_col)
dice_model = dice_ml.Model(model=model, backend="sklearn", model_type="regressor")
exp = dice_ml.Dice(dice_data, dice_model)

print("\n🤖 What-If Suggestions:")
dice_exp = exp.generate_counterfactuals(user_input, total_CFs=1, desired_range=[0, user_true_output * 0.8])

cf = dice_exp.cf_examples_list[0].final_cfs_df[features]
cf_vals = cf.iloc[0]
user_vals = user_input.iloc[0]

for col in features:
    old, new = user_vals[col], cf_vals[col]
    if old != new:
        print(f"➡️ Change '{col}' from {old} to {new}")

new_pred = model.predict(cf)[0]
print(f"\n✅ After applying changes, tax could reduce to ₹{new_pred:.0f} (from ₹{user_true_output:.0f})")
