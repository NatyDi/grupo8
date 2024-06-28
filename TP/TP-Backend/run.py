from flask import Flask
from flask_cors import CORS
from app.database import init_app
from app.views import *

app = Flask(__name__)

# Configurar la aplicación Flask
# app.config.from_pyfile('config/development.py')

# Inicializar la base de datos con la aplicación Flask
init_app(app)

#permitir solicitudes desde cualquier origen
CORS(app)
#CORS(app, resources={r"/api/*": {"origins": "*"}})
# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
#permitir solicitudes desde un origen específico
# CORS(app, resources={r"/api/*": {"origins": "http://127.0.0.1:5000"}})




# Rutas para el CRUD de la entidad Movie
app.route('/', methods=['GET'])(index)
app.route('/api/personajes/', methods=['POST'])(create_personaje)
app.route('/api/personajes/', methods=['GET'])(get_all_personajes)
app.route('/api/personajes/<int:personaje_id>', methods=['GET'])(get_personaje)
app.route('/api/personajes/<int:personaje_id>', methods=['PUT'])(update_personaje)
app.route('/api/personajes/<int:personaje_id>', methods=['DELETE'])(delete_personaje)

if __name__ == '__main__':
    app.run(debug=True)