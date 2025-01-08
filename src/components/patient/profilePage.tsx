import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { FaUser, FaEdit, FaCheck } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../../contexts/authcontext';

interface UserProfile {
  id: number;
  nombre: string;
  apellido: string;
  correoElectronico: string;
  edad: number;
  telefono: string;
  fechaNacimiento: string;
  sexo: string;
  aseguradora: string;
  password: string;
  fechaDeRegistro?: string;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      const calculateAge = (birthdate: string) => {
        const birthDate = new Date(birthdate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
      
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      };

      setProfile({
        id: user.id,
        nombre: user.nombre || '',
        apellido: user.apellido || '',
        correoElectronico: user.correoElectronico || '',
        edad: calculateAge(user.fechaDeNacimiento || ''),
        telefono: user.telefono || '',
        fechaNacimiento: user.fechaDeNacimiento || '',
        sexo: user.sexo || '',
        aseguradora: user.aseguradora || '',
        password: user.password || ''
      });

      console.log('ID del usuario:', user.id);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!profile || !profile.id) {
      console.error('El usuario no tiene un ID válido para la solicitud PUT');
      setError('El usuario no tiene un ID válido');
      return;
    }

    console.log('ID del usuario antes de enviar la solicitud:', profile.id);

    setIsEditing(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);

    const updatedPacienteData = {
      nombre: profile.nombre,
      apellido: profile.apellido,
      correoElectronico: profile.correoElectronico,
      telefono: profile.telefono,
      fechaDeNacimiento: profile.fechaNacimiento,
      sexo: profile.sexo,
      aseguradora: profile.aseguradora,
      password: profile.password,
      estadoDeSalud: "Saludable",
      edad: profile.edad,
    };

    try {
      const response = await axios.put(`http://localhost:8080/api/pacientes/${profile.id}`, updatedPacienteData);
      if (response.status === 200) {
        setProfile(response.data);
        localStorage.setItem('user', JSON.stringify(response.data))
        setUser(response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error al actualizar los datos del usuario:', error.response ? error.response.data : error.message);
      } else {
        console.error('Error al actualizar los datos del usuario:', error);
      }
      setError('Error al actualizar los datos del usuario');
    }
  };

  const handleChange = (field: string, value: string) => {
    if (profile) {
      setProfile({
        ...profile,
        [field]: value,
        edad: field === 'fechaNacimiento' ? calculateAge(value) : profile.edad
      });
    }
  };

  const calculateAge = (birthdate: string) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
  
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <Container className="mt-5">
      {showAlert && (
        <Alert variant="success" className="mb-4">
          <FaCheck className="me-2" /> Perfil actualizado exitosamente
        </Alert>
      )}

      {profile ? (
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
                        value={profile.correoElectronico}
                        onChange={(e) => handleChange('correoElectronico', e.target.value)}
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
                        value={profile.sexo}
                        onChange={(e) => handleChange('sexo', e.target.value)}
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
                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      value={profile.password}
                      onChange={(e) => handleChange('password', e.target.value)}
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
      ) : (
        <div>Cargando...</div>
      )}
    </Container>
  );
};

export default ProfilePage;

function setUser(data: any) {
  throw new Error('Function not implemented.');
}
