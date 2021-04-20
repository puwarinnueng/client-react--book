import Axios from 'axios';
import { useState } from 'react';


function App() {

  //สร้าง state ไว้เก็บข้อมูลจาก form และ set ค่าเริ่มต้น
  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [country, setCountry] = useState("")
  const [position, setPosition] = useState("")
  const [wage, setWage] = useState(0)
  //state update data
  const [newWage, setNewWage] = useState(0)


  const [employeeList, setEmployeeList] = useState([]);

  //ยิง get request ไปที่ api
  const getEmployee = () => {
    Axios.get('http://localhost:3001/employee').then((Response) => {
      setEmployeeList(Response.data);
    });
  }

  //function ในการเพิ่มข้อมูล
  const addEmployee = () => {
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage
        }
      ])
    })
  }


  //ส่งข้อมูลไป update backend
  const updateEmployeeWage = (id) => {
    Axios.put('http://localhost:3001/update', { wage: newWage, id: id }).then((response) => {
      setEmployeeList(
        employeeList.map((val) => {
          return val.id == id ? {
            id: val.id,
            name: val.name,
            country: val.country,
            age: val.age,
            position: val.position,
            wage: newWage
          } : val
        })
      )
    })
  }


  //delete backend send
  const deleteEmployeeWage =  (id) => {

    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
    //การลบต้อง update ข้อมูลด้วย
    setEmployeeList(
      employeeList.filter((val) => {

        return val.id != id;
      })
    )
  })
}







return (
  <div className="App container">
    <h1>Employee information</h1>

    <div className="information">
      <form action="">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">name:</label>
          {/* input เข้าไปเก็บค่าใน state */}
          <input type="text" className="form-control" placeholder="Enter name" onChange={(event) => {
            setName(event.target.value)
          }} />
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">age:</label>
          <input type="number" className="form-control" placeholder="Enter age" onChange={(event) => {
            setAge(event.target.value)
          }} />
        </div>

        <div className="mb-3">
          <label htmlFor="country" className="form-label">country:</label>
          <input type="text" className="form-control" placeholder="Enter country" onChange={(event) => {
            setCountry(event.target.value)
          }} />
        </div>

        <div className="mb-3">
          <label htmlFor="position" className="form-label">position:</label>
          <input type="text" className="form-control" placeholder="Enter position" onChange={(event) => {
            setPosition(event.target.value)
          }} />
        </div>

        <div className="mb-3">
          <label htmlFor="wage" className="form-label">wage:</label>
          <input type="number" className="form-control" placeholder="Enter wage" onChange={(event) => {
            setWage(event.target.value)
          }} />
        </div>

        <button className="btn btn-success" onClick={addEmployee}>Add employee</button>
      </form>
    </div>
    <hr />



    {/* ส่วนดึงข้อมูลมาแสดง */}
    <div className="employee">
      <button className="btn btn-primary" onClick={getEmployee}>Shows Employee</button>

      <br /><br />
      {employeeList.map((val, key) => {

        return (
          <div className="employee  card">
            <div className="card-body text-left">
              <p className="card-text">name: {val.name}</p>
              <p className="card-text">age: {val.age}</p>
              <p className="card-text">country: {val.country}</p>
              <p className="card-text">position: {val.position}</p>
              <p className="card-text">wage: {val.wage}</p>

              {/* สร้างปุ่มอัปเดตข้อมูล */}
              <div className="d-flex">

                <input type="number" placeholder="15000.." style={{ width: "300px" }} className="form-control"
                  onChange={(event) => {
                    setNewWage(event.target.value)
                  }}
                />
                <button className="btn btn-warning" onClick={() => { updateEmployeeWage(val.id) }}>Update</button>
                {/* ปุ่มลบ */}
                <button className="btn btn-danger" onClick={() => { deleteEmployeeWage(val.id) }}>Delete</button>
              </div>

            </div>
          </div>
        )
      })}
    </div>
  </div>
);
}

export default App;
