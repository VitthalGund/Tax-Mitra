import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

df = pd.read_csv("data/convertcsv.csv")
if 'tax_liability' not in df.columns:
    print("⚠️ 'tax_liability' not found, generating dummy values.")
    if "annualIncome" in df.columns and "investment80CAmount" in df.columns:
        df["tax_liability"] = (df["annualIncome"] - df["investment80CAmount"]) * 0.1
    else:
        raise ValueError("Columns 'annualIncome' and 'investment80CAmount' are required to compute dummy tax_liability.")

# Keep only useful numeric columns
numeric_cols = ['annualIncome', 'investment80CAmount', 'healthInsurancePremium', 'homeLoanInterest', 'educationLoanInterest']
X = df[numeric_cols]
y = df["tax_liability"]

model = LinearRegression()
model.fit(X, y)

joblib.dump(model, "tax_model.pkl")
print("✅ Model retrained and saved as tax_model.pkl")
