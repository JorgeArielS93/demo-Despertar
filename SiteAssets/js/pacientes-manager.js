// Funciones para manejar pacientes del centro terapéutico
document.addEventListener('DOMContentLoaded', function() {
    cargarPacientes();
    
    // Evento para el botón de confirmación de eliminar
    document.getElementById('confirm-delete-btn').addEventListener('click', function() {
        const pacienteId = this.getAttribute('data-paciente-id');
        eliminarPaciente(pacienteId);
        $('#deleteConfirmModal').modal('hide');
    });
    
    // Evento para guardar edición
    document.getElementById('save-edit-btn').addEventListener('click', function() {
        guardarEdicion();
    });
});

// Función para cargar pacientes de ejemplo por defecto
function cargarPacientesEjemplo() {
    const pacientesExistentes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    
    // Solo cargar ejemplos si no hay pacientes existentes
    if (pacientesExistentes.length === 0) {
        const fechaBase = new Date(2024, 8, 1); // 1 de septiembre de 2024
        const pacientesEjemplo = [
            {
                id: Date.now() + 1,
                nombres: "María Elena",
                apellidos: "González Pérez",
                documento: "1234567890",
                edad: 8,
                sexo: "F",
                telefono: "301-234-5678",
                fechaNacimiento: "2016-03-15",
                diagnosticoPrincipal: "Trastorno del Espectro Autista (TEA)",
                nivelComunicacion: "Palabras aisladas",
                motivoConsulta: "Dificultades en la comunicación y socialización. Presenta comportamientos repetitivos y necesita apoyo para desarrollar habilidades de interacción social.",
                nombreAcudiente: "Carmen Pérez",
                telefonoAcudiente: "301-234-5679",
                direccion: "Calle 45 #23-12, Bogotá",
                desarrolloMotorGrueso: "Adecuado para la edad",
                desarrolloMotorFino: "Requiere estimulación",
                nivelCognitivo: "Promedio bajo",
                nivelAtencion: "Dispersa, requiere apoyo",
                habilidadesSociales: "Limitadas, en desarrollo",
                nivelAdaptacion: "Requiere rutinas estructuradas",
                observaciones: "Niña con gran potencial, responde bien a estímulos visuales y rutinas predecibles.",
                recomendaciones: "Terapia del lenguaje 2 veces por semana, terapia ocupacional, apoyo psicopedagógico.",
                fechaRegistro: new Date(fechaBase.getTime() + (1 * 24 * 60 * 60 * 1000)).toISOString(),
                institucionEducativa: "Colegio Inclusivo San José"
            },
            {
                id: Date.now() + 2,
                nombres: "Carlos Andrés",
                apellidos: "Martínez López",
                documento: "2345678901",
                edad: 12,
                sexo: "M",
                telefono: "302-345-6789",
                fechaNacimiento: "2012-07-20",
                diagnosticoPrincipal: "Síndrome de Down",
                nivelComunicacion: "Frases simples",
                motivoConsulta: "Apoyo en el desarrollo de habilidades académicas básicas y fortalecimiento de la independencia personal.",
                nombreAcudiente: "Pedro Martínez",
                telefonoAcudiente: "302-345-6780",
                direccion: "Carrera 12 #67-89, Medellín",
                desarrolloMotorGrueso: "Lento pero progresivo",
                desarrolloMotorFino: "Requiere estimulación",
                nivelCognitivo: "Discapacidad intelectual leve",
                nivelAtencion: "Buena con apoyo",
                habilidadesSociales: "Excelentes, muy sociable",
                nivelAdaptacion: "Buena adaptación social",
                observaciones: "Adolescente muy carismático y cooperativo, con excelente disposición para aprender.",
                recomendaciones: "Terapia ocupacional, apoyo académico especializado, fomento de la autonomía personal.",
                fechaRegistro: new Date(fechaBase.getTime() + (15 * 24 * 60 * 60 * 1000)).toISOString(),
                institucionEducativa: "Instituto Educativo Especial"
            },
            {
                id: Date.now() + 3,
                nombres: "Ana Sofía",
                apellidos: "Rodríguez Castro",
                documento: "3456789012",
                edad: 6,
                sexo: "F",
                telefono: "303-456-7890",
                fechaNacimiento: "2018-11-10",
                diagnosticoPrincipal: "TDAH",
                nivelComunicacion: "Comunicación fluida",
                motivoConsulta: "Dificultades atencionales y de autorregulación que afectan el rendimiento escolar y las relaciones sociales.",
                nombreAcudiente: "Lucía Castro",
                telefonoAcudiente: "303-456-7891",
                direccion: "Avenida 68 #45-23, Cali",
                desarrolloMotorGrueso: "Excelente",
                desarrolloMotorFino: "Adecuado",
                nivelCognitivo: "Superior al promedio",
                nivelAtencion: "Muy dispersa, hiperactividad",
                habilidadesSociales: "Buenas pero impulsivas",
                nivelAdaptacion: "Dificultades con normas",
                observaciones: "Niña muy inteligente pero con dificultades significativas de atención y autorregulación emocional.",
                recomendaciones: "Terapia comportamental, estrategias de manejo atencional, apoyo psicopedagógico.",
                fechaRegistro: new Date(fechaBase.getTime() + (10 * 24 * 60 * 60 * 1000)).toISOString(),
                institucionEducativa: "Colegio Nueva Esperanza"
            },
            {
                id: Date.now() + 4,
                nombres: "Luis Fernando",
                apellidos: "Herrera Jiménez",
                documento: "4567890123",
                edad: 15,
                sexo: "M",
                telefono: "304-567-8901",
                fechaNacimiento: "2009-02-28",
                diagnosticoPrincipal: "Síndrome de Asperger",
                nivelComunicacion: "Comunicación fluida",
                motivoConsulta: "Dificultades en la interacción social y adaptación a cambios. Presenta intereses muy específicos y rutinas rígidas.",
                nombreAcudiente: "Roberto Herrera",
                telefonoAcudiente: "304-567-8902",
                direccion: "Calle 123 #45-67, Barranquilla",
                desarrolloMotorGrueso: "Adecuado",
                desarrolloMotorFino: "Excelente",
                nivelCognitivo: "Superior",
                nivelAtencion: "Excelente en áreas de interés",
                habilidadesSociales: "Limitadas, en desarrollo",
                nivelAdaptacion: "Requiere predictibilidad",
                observaciones: "Adolescente con altas capacidades intelectuales, especialmente en matemáticas y ciencias.",
                recomendaciones: "Habilidades sociales, manejo de la flexibilidad cognitiva, apoyo en transición a la vida adulta.",
                fechaRegistro: new Date(fechaBase.getTime() + (25 * 24 * 60 * 60 * 1000)).toISOString(),
                institucionEducativa: "Colegio Técnico Avanzado"
            },
            {
                id: Date.now() + 5,
                nombres: "Isabella",
                apellidos: "Torres Mendoza",
                documento: "5678901234",
                edad: 10,
                sexo: "F",
                telefono: "305-678-9012",
                fechaNacimiento: "2014-09-05",
                diagnosticoPrincipal: "Discapacidad Intelectual",
                nivelComunicacion: "Conversación básica",
                motivoConsulta: "Apoyo en el desarrollo de habilidades académicas básicas, autonomía personal y socialización con pares.",
                nombreAcudiente: "Sandra Mendoza",
                telefonoAcudiente: "305-678-9013",
                direccion: "Transversal 34 #78-90, Bucaramanga",
                desarrolloMotorGrueso: "Levemente retrasado",
                desarrolloMotorFino: "Requiere apoyo constante",
                nivelCognitivo: "Discapacidad intelectual moderada",
                nivelAtencion: "Limitada, requiere apoyo",
                habilidadesSociales: "En desarrollo, muy afectuosa",
                nivelAdaptacion: "Buena con apoyo familiar",
                observaciones: "Niña muy dulce y cooperativa, con gran potencial cuando recibe el apoyo adecuado.",
                recomendaciones: "Terapia ocupacional intensiva, apoyo psicopedagógico, estimulación temprana cognitiva.",
                fechaRegistro: new Date(fechaBase.getTime() + (20 * 24 * 60 * 60 * 1000)).toISOString(),
                institucionEducativa: "Centro Educativo Integral"
            }
        ];
        
        localStorage.setItem('pacientes', JSON.stringify(pacientesEjemplo));
        console.log(`🏥 Centro Terapéutico: ${pacientesEjemplo.length} pacientes de ejemplo cargados exitosamente`);
        console.log('📋 Pacientes cargados:', pacientesEjemplo.map(p => `${p.nombres} ${p.apellidos} (${p.diagnosticoPrincipal})`));
    } else {
        console.log(`✅ Ya existen ${pacientesExistentes.length} pacientes en el sistema`);
    }
}

function cargarPacientes() {
    const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    const container = document.getElementById('pacientes-container');
    const tableBody = document.getElementById('pacientes-table-body');
    const emptyState = document.getElementById('empty-state');
    
    // Limpiar contenedores
    if (container) container.innerHTML = '';
    if (tableBody) tableBody.innerHTML = '';
    
    if (pacientes.length === 0) {
        // Mostrar estado vacío
        if (emptyState) {
            emptyState.style.display = 'block';
        }
        if (container) {
            container.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-info">
                        <h5>No hay pacientes registrados</h5>
                        <p>Haga clic en "Agregar Nuevo Paciente" para realizar una nueva evaluación terapéutica</p>
                        <a href="agregar_paciente.html" class="btn btn-primary">
                            <i class="las la-file-medical"></i> Nueva Evaluación
                        </a>
                    </div>
                </div>
            `;
        }
        return;
    }
    
    // Ocultar estado vacío si hay pacientes
    if (emptyState) {
        emptyState.style.display = 'none';
    }
    
    pacientes.forEach(paciente => {
        // Vista de tarjetas (para backward compatibility)
        if (container) {
            const diagnostico = paciente.diagnosticoPrincipal || 'Sin diagnóstico';
            const diagnosticoColor = getDiagnosticoColor(diagnostico);
            
            const cardHtml = `
                <div class="col-md-4 mb-3">
                    <div class="card">
                        <div class="card-header">
                            <div class="card-img-top">
                                <img class="rounded-circle" src="../SiteAssets/images/people.svg" loading="lazy"/>
                                <div class="mt-2">
                                    <button class="btn btn-sm btn-primary me-1" onclick="editarPaciente(${paciente.id})" title="Editar información">
                                        <i class="las la-edit"></i>
                                    </button>
                                    <button class="btn btn-sm btn-info me-1" onclick="verDetallePaciente(${paciente.id})" title="Ver ficha completa">
                                        <i class="las la-eye"></i>
                                    </button>
                                    <button class="btn btn-sm btn-danger" onclick="confirmarEliminar(${paciente.id}, '${paciente.nombres} ${paciente.apellidos}')" title="Eliminar paciente">
                                        <i class="las la-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="card-subsection-title">
                                <h5>${paciente.nombres} ${paciente.apellidos}</h5>
                                <p class="text-muted">ID: ${paciente.id}</p>
                            </div>
                            <div class="card-subsection-body">
                                <label class="text-muted">edad</label>
                                <p>${paciente.edad || 'N/A'} años</p>
                                <label class="text-muted">diagnóstico</label>
                                <p><span class="badge" style="background-color: ${diagnosticoColor}; color: white;">${diagnostico}</span></p>
                                <label class="text-muted">nivel de comunicación</label>
                                <p>${paciente.nivelComunicacion || 'No especificado'}</p>
                                <label class="text-muted">institución educativa</label>
                                <p>${paciente.institucionEducativa || 'No especificada'}</p>
                            </div>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Evaluación: ${new Date(paciente.fechaRegistro).toLocaleDateString()}</small>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += cardHtml;
        }
        
        // Vista de tabla - Nueva estructura optimizada
        if (tableBody) {
            const nivelComunicacion = paciente.nivelComunicacion || 'No especificado';
            const diagnostico = paciente.diagnosticoPrincipal || 'Sin diagnóstico';
            const fechaEvaluacion = paciente.fechaRegistro ? new Date(paciente.fechaRegistro).toLocaleDateString() : 'N/A';
            
            const rowHtml = `
                <tr>
                    <td><span class="badge badge-secondary">${paciente.id}</span></td>
                    <td>
                        <div class="d-flex align-items-center">
                            <img class="rounded-circle mr-2" src="../SiteAssets/images/people.svg" loading="lazy" style="width: 32px; height: 32px;"/>
                            <div>
                                <strong>${paciente.nombres} ${paciente.apellidos}</strong>
                                <br><small class="text-muted">ID: ${paciente.documento || 'Sin documento'}</small>
                            </div>
                        </div>
                    </td>
                    <td><span class="badge badge-info">${paciente.edad || 'N/A'} años</span></td>
                    <td>
                        <span class="badge badge-warning" style="background-color: ${getDiagnosticoColor(diagnostico)}; color: white;">
                            ${diagnostico}
                        </span>
                    </td>
                    <td>${nivelComunicacion}</td>
                    <td>${fechaEvaluacion}</td>
                    <td>
                        <div class="btn-group" role="group">
                            <button class="btn btn-sm btn-outline-primary" onclick="editarPaciente(${paciente.id})" title="Editar información">
                                <i class="las la-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-info" onclick="verDetallePaciente(${paciente.id})" title="Ver detalle completo">
                                <i class="las la-eye"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger" onclick="confirmarEliminar(${paciente.id}, '${paciente.nombres} ${paciente.apellidos}')" title="Eliminar paciente">
                                <i class="las la-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += rowHtml;
        }
    });
}

function getDiagnosticoColor(diagnostico) {
    const colores = {
        'Trastorno del Espectro Autista (TEA)': '#007bff',
        'Síndrome de Down': '#28a745',
        'Discapacidad Intelectual': '#ffc107',
        'Trastorno del Desarrollo': '#17a2b8',
        'Síndrome de Asperger': '#6f42c1',
        'TDAH': '#fd7e14',
        'Parálisis Cerebral': '#e83e8c',
        'Otro': '#6c757d'
    };
    return colores[diagnostico] || '#6c757d';
}

function confirmarEliminar(pacienteId, nombrePaciente) {
    document.getElementById('paciente-nombre').textContent = nombrePaciente;
    document.getElementById('confirm-delete-btn').setAttribute('data-paciente-id', pacienteId);
    $('#deleteConfirmModal').modal('show');
}

function eliminarPaciente(pacienteId) {
    let pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    pacientes = pacientes.filter(p => p.id != pacienteId);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
    cargarPacientes();
    
    // Mostrar mensaje de éxito
    alert('Paciente eliminado exitosamente');
}

function editarPaciente(pacienteId) {
    const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    const paciente = pacientes.find(p => p.id == pacienteId);
    
    if (paciente) {
        // Llenar el formulario de edición con campos específicos del centro terapéutico
        document.getElementById('edit-paciente-id').value = paciente.id;
        document.getElementById('edit-nombres').value = paciente.nombres || '';
        document.getElementById('edit-apellidos').value = paciente.apellidos || '';
        document.getElementById('edit-documento').value = paciente.documento || '';
        document.getElementById('edit-edad').value = paciente.edad || '';
        document.getElementById('edit-sexo').value = paciente.sexo || '';
        document.getElementById('edit-telefono').value = paciente.telefono || '';
        document.getElementById('edit-motivo').value = paciente.motivoConsulta || '';
        document.getElementById('edit-diagnostico').value = paciente.diagnosticoPrincipal || '';
        document.getElementById('edit-comunicacion').value = paciente.nivelComunicacion || '';
        
        $('#editPacienteModal').modal('show');
    }
}

function guardarEdicion() {
    const pacienteId = document.getElementById('edit-paciente-id').value;
    let pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    
    const indice = pacientes.findIndex(p => p.id == pacienteId);
    
    if (indice !== -1) {
        // Actualizar los datos del paciente
        pacientes[indice].nombres = document.getElementById('edit-nombres').value;
        pacientes[indice].apellidos = document.getElementById('edit-apellidos').value;
        pacientes[indice].documento = document.getElementById('edit-documento').value;
        pacientes[indice].edad = document.getElementById('edit-edad').value;
        pacientes[indice].sexo = document.getElementById('edit-sexo').value;
        pacientes[indice].telefono = document.getElementById('edit-telefono').value;
        pacientes[indice].motivoConsulta = document.getElementById('edit-motivo').value;
        pacientes[indice].diagnosticoPrincipal = document.getElementById('edit-diagnostico').value;
        pacientes[indice].nivelComunicacion = document.getElementById('edit-comunicacion').value;
        pacientes[indice].fechaModificacion = new Date().toISOString();
        
        localStorage.setItem('pacientes', JSON.stringify(pacientes));
        cargarPacientes();
        $('#editPacienteModal').modal('hide');
        
        alert('Información del paciente actualizada exitosamente');
    }
}

function verDetallePaciente(pacienteId) {
    const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    const paciente = pacientes.find(p => p.id == pacienteId);
    
    if (paciente) {
        // Crear ventana modal o nueva página con todos los detalles
        let detalleHTML = `
            <div class="modal fade" id="detallePacienteModal" tabindex="-1">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Ficha Completa - ${paciente.nombres} ${paciente.apellidos}</h5>
                            <button type="button" class="close" data-dismiss="modal">
                                <span>&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <h6>Información Personal</h6>
                                    <p><strong>Edad:</strong> ${paciente.edad || 'N/A'}</p>
                                    <p><strong>Fecha de Nacimiento:</strong> ${paciente.fechaNacimiento || 'N/A'}</p>
                                    <p><strong>Sexo:</strong> ${paciente.sexo === 'M' ? 'Masculino' : paciente.sexo === 'F' ? 'Femenino' : 'N/A'}</p>
                                    <p><strong>Documento:</strong> ${paciente.documento || 'N/A'}</p>
                                    <p><strong>Teléfono:</strong> ${paciente.telefono || 'N/A'}</p>
                                </div>
                                <div class="col-md-6">
                                    <h6>Información Terapéutica</h6>
                                    <p><strong>Diagnóstico:</strong> ${paciente.diagnosticoPrincipal || 'N/A'}</p>
                                    <p><strong>Nivel de Comunicación:</strong> ${paciente.nivelComunicacion || 'N/A'}</p>
                                    <p><strong>Institución Educativa:</strong> ${paciente.institucionEducativa || 'N/A'}</p>
                                    <p><strong>Tipo de Educación:</strong> ${paciente.tipoEducacion || 'N/A'}</p>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-12">
                                    <h6>Motivo de Consulta</h6>
                                    <p>${paciente.motivoConsulta || 'No especificado'}</p>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-6">
                                    <h6>Información Familiar</h6>
                                    <p><strong>Padre:</strong> ${paciente.nombrePadre || 'N/A'}</p>
                                    <p><strong>Madre:</strong> ${paciente.nombreMadre || 'N/A'}</p>
                                    <p><strong>Estado Civil Padres:</strong> ${paciente.estadoCivilPadres || 'N/A'}</p>
                                </div>
                                <div class="col-md-6">
                                    <h6>Desarrollo</h6>
                                    <p><strong>Primeras Palabras:</strong> ${paciente.primerasPalabras || 'N/A'} meses</p>
                                    <p><strong>Caminar:</strong> ${paciente.edadCaminar || 'N/A'} meses</p>
                                    <p><strong>Control Esfínteres:</strong> ${paciente.edadEsfinteres || 'N/A'} años</p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary" onclick="editarPaciente(${paciente.id})">Editar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Eliminar modal existente si existe
        const modalExistente = document.getElementById('detallePacienteModal');
        if (modalExistente) {
            modalExistente.remove();
        }
        
        // Agregar el nuevo modal al DOM
        document.body.insertAdjacentHTML('beforeend', detalleHTML);
        
        // Mostrar el modal
        $('#detallePacienteModal').modal('show');
    }
}

// Función para ver el detalle completo del paciente en una página separada
function verDetallePaciente(pacienteId) {
    window.location.href = `details.html?id=${pacienteId}`;
}

// Función para restablecer los datos de ejemplo
function restablecerDatosEjemplo() {
    if (confirm('¿Está seguro que desea restablecer todos los datos a los ejemplos por defecto? Esto eliminará todos los pacientes actuales.')) {
        // Limpiar datos existentes
        localStorage.removeItem('pacientes');
        
        // Cargar pacientes de ejemplo
        cargarPacientesEjemplo();
        
        // Recargar la tabla
        cargarPacientes();
        
        // Mostrar mensaje de confirmación
        alert('Datos de ejemplo restablecidos exitosamente. Se han cargado 5 pacientes de ejemplo.');
    }
}

// Función para manejar la edición desde URL (cuando se viene de detalle)
document.addEventListener('DOMContentLoaded', function() {
    // Cargar pacientes de ejemplo si no existen
    cargarPacientesEjemplo();
    
    // Cargar y mostrar pacientes
    cargarPacientes();
    
    // Manejar edición desde URL
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    
    if (editId) {
        // Esperar un poco para que la página cargue completamente
        setTimeout(() => {
            editarPaciente(editId);
        }, 500);
    }
    
    // Event listener para el botón de guardar edición
    const saveEditBtn = document.getElementById('save-edit-btn');
    if (saveEditBtn) {
        saveEditBtn.addEventListener('click', guardarEdicion);
    }
    
    // Event listener para el botón de confirmar eliminación
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', function() {
            const pacienteId = this.getAttribute('data-paciente-id');
            eliminarPaciente(pacienteId);
        });
    }
});
