const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');


const UserSchema = new Schema({
    uui: {
        type: String,
        default: uuidv4,
        index: true,
    },
    name: String,
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    pan: String,
    aadhaar: String,
    dob: Date,
    address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
    },
    phone: String,
}, {
    timestamps: true,
});


const SalaryIncomeSchema = new Schema({
    basicSalary: { type: Number, default: 0 },
    allowances: {
        hra: { type: Number, default: 0 },
        conveyance: { type: Number, default: 0 },
        specialAllowance: { type: Number, default: 0 },
        otherAllowances: { type: Number, default: 0 },
    },
    perquisites: [
        {
            description: String,
            value: Number,
        }
    ],
    bonus: { type: Number, default: 0 },
    deductions: {
        standardDeduction: { type: Number, default: 0 },
        professionalTax: { type: Number, default: 0 },
        otherSalaryDeductions: { type: Number, default: 0 },
    },
    tds: { type: Number, default: 0 }
});


const ServiceIncomeSchema = new Schema({
    grossServiceIncome: { type: Number, default: 0 },
    allowableExpenses: {
        officeRent: { type: Number, default: 0 },
        utilities: { type: Number, default: 0 },
        travelCommunication: { type: Number, default: 0 },
        professionalFees: { type: Number, default: 0 },
        otherExpenses: { type: Number, default: 0 },
    },
    depreciation: { type: Number, default: 0 },
    tds: { type: Number, default: 0 }
});


const BusinessIncomeSchema = new Schema({
    grossTurnover: { type: Number, default: 0 },
    cogs: { type: Number, default: 0 },
    operatingExpenses: {
        rent: { type: Number, default: 0 },
        salaries: { type: Number, default: 0 },
        utilities: { type: Number, default: 0 },
        marketing: { type: Number, default: 0 },
        adminExpenses: { type: Number, default: 0 },
        otherExpenses: { type: Number, default: 0 },
    },
    depreciation: { type: Number, default: 0 },
    adjustments: { type: Number, default: 0 }
});


const InvestmentIncomeSchema = new Schema({
    rentalIncome: {
        grossRental: { type: Number, default: 0 },
        municipalTaxes: { type: Number, default: 0 },
        standardDeduction: { type: Number, default: 0 }
    },
    capitalGains: [
        {
            assetType: { type: String }, // e.g., property, equity
            salePrice: { type: Number, default: 0 },
            costOfAcquisition: { type: Number, default: 0 },
            purchaseDate: { type: Date },
            saleDate: { type: Date },
            indexationFactor: { type: Number, default: 1 },
            holdingPeriod: { type: String, enum: ['short-term', 'long-term'] }
        }
    ],
    interestIncome: { type: Number, default: 0 },
    dividendIncome: { type: Number, default: 0 }
});


const OtherIncomeSchema = new Schema({
    otherInterest: { type: Number, default: 0 },
    lotteryWinnings: { type: Number, default: 0 },
    otherIncome: { type: Number, default: 0 },
    tds: { type: Number, default: 0 }
});

const DeductionSchema = new Schema({
    section80C: { type: Number, default: 0 },
    section80CCD: { type: Number, default: 0 },
    section80D: { type: Number, default: 0 },
    section80E: { type: Number, default: 0 },
    section80G: { type: Number, default: 0 },
    section80TTA: { type: Number, default: 0 },
    section80TTB: { type: Number, default: 0 },
    homeLoanInterest: { type: Number, default: 0 },
    principalRepayment: { type: Number, default: 0 },
    medicalExpenses: { type: Number, default: 0 },
    tuitionFees: { type: Number, default: 0 },
    otherDeductions: { type: Number, default: 0 }
});

const ExemptionRecommendationSchema = new Schema({
    hraExemption: { type: Number, default: 0 },
    standardExemption: { type: Number, default: 0 },
    otherExemptions: { type: Number, default: 0 }
});

const DeductionRecommendationSchema = new Schema({
    section80C: { type: Number, default: 0 },
    section80CCD: { type: Number, default: 0 },
    section80D: { type: Number, default: 0 },
    section80E: { type: Number, default: 0 },
    section80G: { type: Number, default: 0 },
    section80TTA: { type: Number, default: 0 },
    section80TTB: { type: Number, default: 0 },
    homeLoanInterest: { type: Number, default: 0 },
    principalRepayment: { type: Number, default: 0 },
    medicalExpenses: { type: Number, default: 0 },
    tuitionFees: { type: Number, default: 0 },
    otherDeductions: { type: Number, default: 0 }
});

const RebateRecommendationSchema = new Schema({
    rebateUnderSection87A: { type: Number, default: 0 },
    otherRebates: { type: Number, default: 0 }
});

const RecommendationSchema = new Schema({
    deductions: DeductionRecommendationSchema,
    exemptions: ExemptionRecommendationSchema,
    rebates: RebateRecommendationSchema,
    finalTaxLiability: { type: Number, default: 0 },
    computedOn: { type: Date, default: Date.now }
});

const TaxRecordSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    financialYear: { type: String, required: true }, // e.g., "2023-2024"
    salaryIncome: SalaryIncomeSchema,
    serviceIncome: ServiceIncomeSchema,
    businessIncome: BusinessIncomeSchema,
    investmentIncome: InvestmentIncomeSchema,
    otherIncome: OtherIncomeSchema,
    deductions: DeductionSchema,
    taxPaid: { type: Number, default: 0 },
    tdsDetails: { type: Number, default: 0 },
    recommendations: RecommendationSchema,
    uui: {
        type: String,
        default: uuidv4,
        index: true
    },
    createdAt: { type: Date, default: Date.now }
});


export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const TaxRecord = mongoose.models.TaxRecord || mongoose.model('TaxRecord', TaxRecordSchema);
