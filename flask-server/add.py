import pandas as pd
from flask import Flask
from app import db, RiskEvaluationBase  # Adjust the import according to your project structure

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123@localhost/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

def import_risk_evaluation_data(excel_path):
    df = pd.read_excel(excel_path, engine='openpyxl')

    with app.app_context():  # This line sets the Flask application context
        for index, row in df.iterrows():
            type_of_workplace = 'სკოლა' #.split('-')[0].strip()
            risk_entry = RiskEvaluationBase(
                type_of_the_workplace=type_of_workplace,
                risk=row['საფრთხე'],
                risk_coefficient=float(row['საფრთხის კოეფიციენტი']),
                control_mechanism=row['კონტროლის ზომები'],
                type=row['ტიპი'],
                control_mechanism_score=int(row['კონტროლის ზომის ქულა']),
                reduces_potential_harm=bool(int(row['"ამცირებს პოტენციურ ზიანს" (კი - 1, არა - 0)']))
            )
            db.session.add(risk_entry)
        db.session.commit()

# Specify the correct path to your Excel file
file_path = r'D:\სკოლა - საფრთხეები და კონტროლის ზომები-1.xlsx'
import_risk_evaluation_data(file_path)