from app.database import get_db

class Personaje:
    def __init__(self, id_personaje=None, personaje=None, descripcion=None, fecha_nacimiento=None, url_foto=None):
        self.id_personaje = id_personaje
        self.personaje = personaje
        self.descripcion = descripcion
        self.fecha_nacimiento = fecha_nacimiento
        self.url_foto = url_foto

    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.id_personaje:
            cursor.execute("""
                UPDATE personajes SET personaje = %s, descripcion = %s, fecha_nacimiento = %s, url_foto = %s
                WHERE id_personaje = %s
            """, (self.personaje, self.descripcion, self.fecha_nacimiento, self.url_foto, self.id_personaje))
        else:
            cursor.execute("""
                INSERT INTO personajes (personaje, descripcion, fecha_nacimiento, url_foto) VALUES (%s, %s, %s, %s)
            """, (self.personaje, self.descripcion, self.fecha_nacimiento, self.url_foto))
            self.id_personaje = cursor.lastrowid
        db.commit()
        cursor.close()

    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM personajes")
        rows = cursor.fetchall()
        personajes = [Personaje(id_personaje=row[0], personaje=row[1], descripcion=row[2], fecha_nacimiento=row[3], url_foto=row[4]) for row in rows]
        cursor.close()
        return personajes

    @staticmethod
    def get_by_id(personaje_id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM personajes WHERE id_personaje = %s", (personaje_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Personaje(id_personaje=row[0], personaje=row[1], descripcion=row[2], fecha_nacimiento=row[3], url_foto=row[4])
        return None

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM personajes WHERE id_personaje = %s", (self.id_personaje,))
        db.commit()
        cursor.close()

    def serialize(self):
        return {
            'id_personaje': self.id_personaje,
            'personaje': self.personaje,
            'descripcion': self.descripcion,
            'fecha_nacimiento': self.fecha_nacimiento.strftime('%Y-%m-%d'),
            'url_foto': self.url_foto
        }

