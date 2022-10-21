import { useNavigate } from "react-router-dom";
import { FormGroup, Label, Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import axios from 'axios';
import { UserSchema } from "../../utils/utils";

function AddUser() {
  const navigate = useNavigate();

  const onSubmit = (values) => {
    axios.post('http://localhost:3001/api/users', values)
      .then(res => res.data)
      .then(data => {
        if(!data.error) {
          navigate("/", { replace: true });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="p-4">
      <div>Add user</div>
      <Formik
        initialValues={{ username: "", email: "" }}
        validationSchema={UserSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, values, errors, touched }) => {
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

export default AddUser;