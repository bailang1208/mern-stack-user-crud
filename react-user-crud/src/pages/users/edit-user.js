import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormGroup, Label, Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import axios from 'axios';
import { UserSchema } from "../../utils/utils";

function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({});

  const updateFieldValue = useRef(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = () => {
    axios.get(`http://localhost:3001/api/users/${id}`)
      .then(res => res.data)
      .then(data => {
        console.log(data);
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const onSubmit = (values) => {
    axios.put(`http://localhost:3001/api/users/${id}`, values)
      .then(res => res.data)
      .then(data => {
        if (!data.error) {
          navigate("/", { replace: true });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="p-4">
      <div>Edit user</div>
      <Formik
        enableReinitialize={true}
        initialValues={{ username: user.username, email: user.email }}
        validationSchema={UserSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, values, errors, touched }) => {
          updateFieldValue.current = setFieldValue;
          return (
            <Form className="mt-4 tooltip-label-bottom">
              <FormGroup className="form-group has-float-label  mb-4">
                <Label>User Name</Label>
                <Field className="form-control" name="username" placeholder="User Name" />
                {errors.username && touched.username ? (
                  <div className="invalid-feedback d-block">{errors.username}</div>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Field className="form-control" name="email" placeholder="Email" />
                {errors.email && touched.email ? (
                  <div className="invalid-feedback d-block">{errors.email}</div>
                ) : null}
              </FormGroup>
              <div className="d-flex justify-content-end">
                <Button color="success" type="submit">Submit</Button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default EditUser;