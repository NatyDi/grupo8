from flask import jsonify, request
from app.models import Personaje

def index():
    return jsonify({'message': 'Hello World API La Web del Celiaco'})

def create_personaje():
    data = request.json
    new_personaje = Personaje(personaje=data['personaje'], descripcion=data['descripcion'], fecha_nacimiento=data['fecha_nacimiento'], url_foto=data['url_foto'])
    new_personaje.save()
    return jsonify({'message': 'Personaje creado correctamente'}), 201
   

def get_all_personajes():
    personajes = Personaje.get_all()
    return jsonify([personaje.serialize() for personaje in personajes])

def get_personaje(personaje_id):
    personaje = Personaje.get_by_id(personaje_id)
    if not personaje:
        return jsonify({'message': 'Personaje no encontrado'}), 404
    return jsonify(personaje.serialize())

def update_personaje(personaje_id):
    personaje = Personaje.get_by_id(personaje_id)
    if not personaje:
        return jsonify({'message': 'Personaje no encontrado'}), 404
    data = request.json
    personaje.personaje = data['personaje']
    personaje.descripcion = data['descripcion']
    personaje.fecha_nacimiento = data['fecha_nacimiento']
    personaje.url_foto = data['url_foto']
    personaje.save()
    return jsonify({'message': 'Personaje actualizado correctamente'})

def delete_personaje(personaje_id):
    personaje = Personaje.get_by_id(personaje_id)
    if not personaje:
        return jsonify({'message': 'Personaje not found'}), 404
    personaje.delete()
    return jsonify({'message': 'Personaje eliminado correctamente'})