import React, { useState } from 'react';
import { Container, Card, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { FaUser, FaEdit, FaCheck } from 'react-icons/fa';

interface UserProfile {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  genero: string;
  direccion: string;
  contactoEmergencia: {
    nombre: string;
    telefono: string;
    relacion: string;
  };
}

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  
  const [profile, setProfile] = useState<UserProfile>({
    nombre: "Diomedes",
    apellido: "Díaz",
    email: "diomedesdiaz@gmail.com",
    telefono: "+57 3001234567",
    fechaNacimiento: "1995-05-26",
    genero: "Masculino",
    aseguradora: "Coosalud",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setProfile(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof UserProfile],
          [child]: value
        }
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  return (
    <Container className="mt-5">
      {showAlert && (
        <Alert variant="success" className="mb-4">
          <FaCheck className="me-2" /> Perfil actualizado exitosamente
        </Alert>
      )}

      <Card>
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <FaUser size={24} className="me-2" />
            <h3 className="mb-0">Mi Perfil</h3>
          </div>
          <Button
            variant={isEditing ? "light" : "outline-light"}
            onClick={() => setIsEditing(!isEditing)}
          >
            <FaEdit className="me-2" />
            {isEditing ? "Cancelar Edición" : "Editar Perfil"}
          </Button>
        </Card.Header>

        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-4">
              <Col md={6}>
                <h5 className="mb-3">Información Personal</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    value={profile.nombre}
                    onChange={(e) => handleChange('nombre', e.target.value)}
                    disabled={!isEditing}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    value={profile.apellido}
                    onChange={(e) => handleChange('apellido', e.target.value)}
                    disabled={!isEditing}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="tel"
                    value={profile.telefono}
                    onChange={(e) => handleChange('telefono', e.target.value)}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <h5 className="mb-3">Información Adicional</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha de Nacimiento</Form.Label>
                  <Form.Control
                    type="date"
                    value={profile.fechaNacimiento}
                    onChange={(e) => handleChange('fechaNacimiento', e.target.value)}
                    disabled={!isEditing}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Género</Form.Label>
                  <Form.Select
                    value={profile.genero}
                    onChange={(e) => handleChange('genero', e.target.value)}
                    disabled={!isEditing}
                  >
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Otro">Otro</option>
                    <option value="Prefiero no decir">Prefiero no decir</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Aseguradora</Form.Label>
                  <Form.Control
                    type="text"
                    value={profile.aseguradora}
                    onChange={(e) => handleChange('aseguradora', e.target.value)}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Col>
            </Row>

            {isEditing && (
              <div className="text-end">
                <Button variant="secondary" className="me-2" onClick={() => setIsEditing(false)}>
                  Cancelar
                </Button>
                <Button variant="primary" type="submit">
                  Guardar Cambios
                </Button>
              </div>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;
