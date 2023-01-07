import { Table } from 'react-bootstrap'
import { Link } from "react-router-dom"

const Users = (users) => {
    const data = Object.values(users)[0]

    return (
        <Table striped style={{margin: '20px'}} >
            <thead>
                <tr>
                    <th>User</th>
                    <th>Blogs created</th>
                </tr>
            </thead>
            <tbody>
                {data.map(user => 
                    <tr key = {user.id}>
                        <td>
                            <Link to = {`/users/${user.id}`}> {user.name}</Link>
                        </td>
                        <td>{user.blogs.length}</td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}

export default Users