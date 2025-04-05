import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import joblib
import shap
import os
import matplotlib.pyplot as plt
import numpy as np
import random

def train_model_with_shap(csv_path="data/convertcsv.csv"):
    df = pd.read_csv(csv_path)

    # Drop unusable columns
    drop_cols = ['fullName', 'email', 'mobileNumber', 'dateOfBirth', 'panNumber', 'form16File', 'panCardFile', 'additionalDocuments']
    df = df.drop(columns=[col for col in drop_cols if col in df.columns])

    # Encode categorical columns
    for col in df.columns:
        if df[col].dtype == 'object' or df[col].dtype.name == 'category':
            df[col] = df[col].astype('category').cat.codes

    # Dummy target if not present
    if 'tax_liability' not in df.columns:
        print("⚠️ 'tax_liability' column not found. Generating dummy values for now.")
        df['tax_liability'] = [random.randint(1000, 100000) for _ in range(len(df))]

    X = df.drop(columns=['tax_liability'])
    y = df['tax_liability']

    # Final debug info
    print("🔎 Final training features:")
    print(X.dtypes)

    # ✅ Fix: Cast everything to float64
    X = X.astype('float64')

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    joblib.dump(model, 'model.pkl')
    print("✅ Model trained and saved as 'model.pkl'")

    print("🔍 Generating SHAP explanations...")
    explainer = shap.Explainer(model, X)
    shap_values = explainer(X)

    os.makedirs("shap_explanations", exist_ok=True)

    # Save SHAP summary plot only (clean output)
    plt.figure()
    shap.summary_plot(shap_values, X, show=False)
    summary_path = "shap_explanations/shap_summary_plot.png"
    plt.savefig(summary_path, bbox_inches="tight")
    plt.close()
    print(f"📊 SHAP summary plot saved to {summary_path}")

if __name__ == "__main__":
    train_model_with_shap("data/convertcsv.csv")
