from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from flask_bcrypt import Bcrypt
from flask_cors import CORS





app = Flask(__name__)
CORS(app)
basedir = os.path.abspath(os.path.dirname(__file__))

bcrypt = Bcrypt(app)


# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

class Listing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)





def create_app():
    with app.app_context():
        db.create_all()
    return app




# API routes
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Missing username or password'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists'}), 400

    new_user = User(username=username)
    new_user.set_password(password)  # Hash the password
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        return jsonify({'message': 'Login successful', 'user_id': user.id}), 200
    return jsonify({'message': 'Invalid credentials'}), 401


@app.route('/listings', methods=['POST'])
def post_listing():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    price = data.get('price')
    user_id = data.get('user_id')

    if not all([title, description, price, user_id]):
        return jsonify({'message': 'Missing fields'}), 400

    new_listing = Listing(title=title, description=description, price=price, user_id=user_id)
    db.session.add(new_listing)
    db.session.commit()

    return jsonify({'message': 'Listing created successfully'}), 201


@app.route('/listings', methods=['GET'])
def get_listings():
    listings = Listing.query.all()
    listings_data = [{
        'id': listing.id,
        'title': listing.title,
        'description': listing.description,
        'price': listing.price,
        'user_id': listing.user_id
    } for listing in listings]

    return jsonify(listings_data), 200





@app.route('/listings/<int:listing_id>', methods=['PUT'])
def update_listing(listing_id):
    data = request.get_json()
    user_id = data.get('user_id')

    listing = Listing.query.get_or_404(listing_id)

    if listing.user_id != user_id:
        return jsonify({'message': 'Unauthorized'}), 401
    listing = Listing.query.get_or_404(listing_id)
    data = request.get_json()

    title = data.get('title')
    description = data.get('description')
    price = data.get('price')
    
    # In a real-world application, you should also verify the user's identity
    if title:
        listing.title = title
    if description:
        listing.description = description
    if price:
        listing.price = price

    db.session.commit()
    return jsonify({'message': 'Listing updated successfully'}), 200


@app.route('/listings/<int:listing_id>', methods=['DELETE'])
def delete_listing(listing_id):
        data = request.get_json()
        user_id = data.get('user_id')

        listing = Listing.query.get_or_404(listing_id)

        if listing.user_id != user_id:
                return jsonify({'message': 'Unauthorized'}), 401

        db.session.delete(listing)
        db.session.commit()
        return jsonify({'message': 'Listing deleted successfully'}), 200


# route for profiles

@app.route('/profile/<int:user_id>', methods=['GET'])
def get_profile(user_id):
    user = User.query.get_or_404(user_id)
    listings = Listing.query.filter_by(user_id=user_id).all()
    listings_data = [{
        'id': listing.id,
        'title': listing.title,
        'description': listing.description,
        'price': listing.price,
        'user_id': listing.user_id
    } for listing in listings]

    return jsonify({
        'id': user.id,
        'username': user.username,
        'listings': listings_data
    }), 200


@app.route('/profile/<int:user_id>', methods=['PUT'])
def update_profile(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')

    if username:
        user.username = username
    if password:
        user.set_password(password)

    db.session.commit()
    return jsonify({'message': 'Profile updated successfully'}), 200


@app.route('/profile/<int:user_id>', methods=['DELETE'])
def delete_profile(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'Profile deleted successfully'}), 200

# route for all users profiles

@app.route('/profiles', methods=['GET'])
def get_profiles():
    users = User.query.all()
    users_data = [{
        'id': user.id,
        'username': user.username
    } for user in users]

    return jsonify(users_data), 200



if __name__ == '__main__':
    create_app()
    app.run(debug=True)