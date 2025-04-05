from faker import Faker
import random
import json

fake = Faker("en_IN")  

def generate_fake_user_data(n=10):
    users = []

    for _ in range(n):
        full_name = fake.name()
        email = fake.email()
        mobile_number = fake.msisdn()[:10]  
        date_of_birth = fake.date_of_birth(minimum_age=21, maximum_age=60).isoformat()
        pan_number = fake.bothify(text='?????####?', letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ').upper()

        employment_type = random.choice(["Salaried", "Self-employed", "Freelancer", "Unemployed"])
        annual_income = random.randint(200000, 3000000)
        has_foreign_income = random.choice([True, False])
        is_gst_registered = random.choice([True, False])

        has_80C = random.choice([True, False])
        investment_80C_amount = random.randint(0, 150000) if has_80C else 0
        health_insurance_premium = random.randint(0, 75000)
        home_loan_interest = random.randint(0, 200000)
        education_loan_interest = random.randint(0, 100000)

        user = {
            "fullName": full_name,
            "email": email,
            "mobileNumber": mobile_number,
            "dateOfBirth": date_of_birth,
            "panNumber": pan_number,
            "employmentType": employment_type,
            "annualIncome": annual_income,
            "hasForeignIncome": has_foreign_income,
            "isGstRegistered": is_gst_registered,
            "has80CInvestments": has_80C,
            "investment80CAmount": investment_80C_amount,
            "healthInsurancePremium": health_insurance_premium,
            "homeLoanInterest": home_loan_interest,
            "educationLoanInterest": education_loan_interest,
            "form16File": None,
            "panCardFile": None,
            "additionalDocuments": None
        }

        users.append(user)

    return users

if __name__ == "__main__":
    fake_users = generate_fake_user_data(50)
    with open("fake_user_data.json", "w") as f:
        json.dump(fake_users, f, indent=2)

    print("✅ 50 fake users generated and saved to 'fake_user_data.json'")
