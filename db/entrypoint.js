console.log('>>Start set entrypoint script')
// eslint-disable-next-line no-undef
const connAdmin = db.getSiblingDB('admin')
connAdmin.auth(process.env.DOCKER_DB_ROOT_USERNAME, process.env.DOCKER_DB_ROOT_PASSWORD)

// create and move to your new database
const connPortal = connAdmin.getSiblingDB(process.env.DOCKER_DB_NAME)
connPortal.createUser({
  user: process.env.DOCKER_DB_USER,
  pwd: process.env.DOCKER_DB_PASSWORD,
  roles: [{
    role: 'readWrite',
    db: process.env.DOCKER_DB_NAME
  }]
})

// users and job_offers collections created
connPortal.createCollection('users')
connPortal.createCollection('job_offers')
const resUser = connPortal.users.insertOne(
  {
    email: 'test@gmail.com',
    name: 'test 2',
    password: '$2b$12$KnL3jZOw3FTrwCra8RCrXO.Jzff.T/I0tSgMiJjt9gWNdnQE1hHFm'
  }
)

connPortal.job_offers.insertOne(
  {
    title: 'Sofware enginner',
    company: 'Fedex',
    location: 'Lima',
    salary: '1234',
    contract: 'Full Time',
    description: '<div>INDRA es una de las principales compañías globales de tecnología y consultoría y el socio tecnológico para las operaciones clave de los negocios de sus clientes en todo el mundo. Es un proveedor líder mundial de soluciones propias en segmentos específicos de los mercados de Transporte y Defensa, y la empresa líder en consultoría de transformación digital y Tecnologías de la Información en España y Latinoamérica. Con cerca de 48.000 empleados, presencia local en 46 países y operaciones comerciales en más de 140 países. Ven y unete a INDRA!<br><br>DESARROLLADOR BACKEND<br><br>Tecnologias solicitadas:<br>- NodeJs<br>- Serveless<br>- AWS (Cognito, RDS, Lambdas, S3)<br><br><br>Beneficios:<br>EPS 100%<br>Cursos y certificaciones 100%<br>Planilla Completa<br>Beneficios Corporativos<br>----------------------------</div><div><strong><br>Requerimientos<br></strong><br></div><ul><li>Educación mínima: Técnico</li><li>2 años de experiencia</li></ul>',
    skills: ['jQuery', 'Node', 'React Hooks', 'PHP'],
    author: resUser.insertedId,
    url: 'sofware-enginner-3fgk-ddm3s'
  }
)

console.log('>>End set entrypoint script')
