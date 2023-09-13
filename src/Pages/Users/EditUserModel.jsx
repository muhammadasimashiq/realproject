import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import TextFieldComp from "./../../Components/UI/Input/TextField";
import ButtonComp from "./../../Components/UI/Button/Button";
import Typography from "./../../Components/UI/Typography/Typography";
import StackComp from "./../../Components/UI/Layout/Stack/Stack";
import SelectTextField from "./../../Components/UI/SelectTextField/SelectTextField";
import api from "../../services";

const Main = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
}));
const Button = styled(ButtonComp)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
const ButtonWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
const Row = styled(StackComp)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
}));
const Span = styled("div")(({ theme }) => ({
  width: "100%",
}));

const EditUserModel = ({
  recordForEdit,
  levels,
  getUserData,
  setOpenModel,
}) => {
  const [selectedCountry, setSelectedCountry] = React.useState();
  const [selectedGrade, setSelectedGrade] = React.useState("");
  const [grades, setGrades] = React.useState([]);
  const [city, setCity] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [school, setSchool] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  function setCountryFunc(data) {
    setSelectedCountry(data);
  }

  function setSelectedGradeFunc(data) {
    setSelectedGrade(data);
  }
  const profileHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      fname: firstName,
      lname: lastName,
      country: selectedCountry.value,
      phone: contact,
      schoolName: school,
      city: city,
      gradeLevelId: selectedGrade.id,
      userId: recordForEdit.id,
    };
    const result = await api.put.updateUserProfile(data);
    const { error } = result;
    if (error) {
      alert("error occured while updating");
    } else {
      alert("updated successfully");
    }
    setIsLoading(false);
    getUserData();
    setOpenModel(false);
  };
  useEffect(() => {
    if (levels) {
      setGrades([...levels.map((el) => ({ ...el, value: el.title }))]);
    }
    setCity(recordForEdit.city);
    setContact(recordForEdit.contact);
    setEmail(recordForEdit.email);
    setFirstName(recordForEdit.firstName);
    setLastName(recordForEdit.lastName);
    setSchool(recordForEdit.school);
    setSelectedCountry(recordForEdit.country);
  }, []);

  return (
    <Main>
      <Row>
        <Span>
          <Typography>Edit First Name: </Typography>
          <TextFieldComp
            onChange={(e) => setFirstName(e.target.value)}
            fluid
            label=""
            value={firstName}
            fullWidth
          />
        </Span>
        <Span>
          <Typography>Edit Last Name: </Typography>
          <TextFieldComp
            onChange={(e) => setLastName(e.target.value)}
            fluid
            label=""
            value={lastName}
            fullWidth
          />
        </Span>
      </Row>
      <Row>
        <Span>
          <Typography>Edit Contact: </Typography>
          <TextFieldComp
            onChange={(e) => setContact(e.target.value)}
            label=""
            value={contact}
            fullWidth
          />
        </Span>
        <Span>
          <Typography>Edit User Email: </Typography>
          <TextFieldComp
            onChange={(e) => setEmail(e.target.value)}
            fluid
            label=""
            value={email}
            fullWidth
          />
        </Span>
      </Row>
      <Row>
        <Span>
          <Typography>Edit Country: </Typography>
          <SelectTextField
            // data={countries}
            labelName=""
            defaultFieldValue={selectedCountry}
            getLevel={setCountryFunc}
            fullWidth
          />
        </Span>
        <Span>
          <Typography>Edit City: </Typography>
          <TextFieldComp
            onChange={(e) => setCity(e.target.value)}
            label=""
            value={city}
            fullWidth
          />
        </Span>
      </Row>
      <Row>
        <Span>
          {" "}
          <Typography>Edit School: </Typography>
          <TextFieldComp
            onChange={(e) => setSchool(e.target.value)}
            label=""
            value={school}
            fullWidth
          />
        </Span>
        <Span>
          <Typography>Edit User Grade: </Typography>
          <SelectTextField
            fullWidth
            labelName=""
            defaultName="Select Level"
            data={grades}
            getLevel={setSelectedGradeFunc}
            defaultFieldValue={
              selectedGrade ? selectedGrade.name : recordForEdit.grade
            }
          />
        </Span>
      </Row>
      <ButtonWrapper>
        <Button onClick={profileHandler} disabled={isLoading ? true : false}>
          {isLoading ? "Please Wait ....." : "Update"}
        </Button>
      </ButtonWrapper>
    </Main>
  );
};

export default EditUserModel;
