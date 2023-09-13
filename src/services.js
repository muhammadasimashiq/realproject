import baseUrl from "./config/baseUrl";

const getSubjects = async () => {
  let token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const data = await fetch(`${baseUrl}/subject`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      result = JSON.parse(result);
      return result;
    })
    .catch((error) => error);
  return data;
};

const getChaptersNotesList = async (selectedId) => {
  const token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const data = await fetch(
    `${baseUrl}/note/snack-id/${selectedId}?chapter=true`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      result = JSON.parse(result);
      return result;
    })
    .catch((error) => error);
  return data;
};
const getSnackNotes = async (selectedSnackId) => {
  const token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const data = await fetch(
    `${baseUrl}/note/snack-id/${selectedSnackId}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      result = JSON.parse(result);
      return result;
    })
    .catch((error) => error);
  return data;
};

const allTags = async () => {
  let token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const data = await fetch(`${baseUrl}/tag`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
  return data;
};

const addSubjects = async (subject) => {
  let token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    title: subject,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const data = await fetch(`${baseUrl}/subject`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
  return data;
};

const editSubject = async (subjectID, subjectName) => {
  let token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    title: subjectName,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const data = await fetch(`${baseUrl}/subject/${subjectID}`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);

  return data;
};

const addCategory = async (category) => {
  let token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    title: category,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const data = await fetch(`${baseUrl}/tag`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
  return data;
};

const getCategories = async () => {
  const token = localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const data = await fetch(`${baseUrl}/tag`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      result = JSON.parse(result);
      let temp = result.data.map((row) => ({
        ...row,
        category: row.title.charAt(0).toUpperCase() + row.title.slice(1),
      }));
      return temp;
    })
    .catch((error) => console.log("error", error));
  return data;
};

const editCategories = async (categoryID, edittedValue) => {
  let token = await localStorage.getItem("auth-token");
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");
  let raw = JSON.stringify({
    title: edittedValue,
  });

  let requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const data = await fetch(`${baseUrl}/tag/${categoryID}`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
  return data;
};

const updateChapterNotes = async (e, selectedChapterId, tagIdState) => {
  let token = await localStorage.getItem("auth-token");
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");
  let raw = {
    body: JSON.stringify(e),
    chapterId: selectedChapterId,
    tagId: tagIdState,
  };

  let requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(raw),
    redirect: "follow",
  };

  const data = await fetch(
    `${baseUrl}/note/${selectedChapterId}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
  return data;
};
const updateSnackNotes = async ({
  e,
  selectedSnackId,
  tagIdState,
  currentNoteId,
}) => {
  let token = await localStorage.getItem("auth-token");
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");
  let raw = {
    body: JSON.stringify(e),
    snackId: selectedSnackId,
    tagId: tagIdState,
  };

  let requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(raw),
    redirect: "follow",
  };

  const data = await fetch(`${baseUrl}/note/${currentNoteId}`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
  return data;
};

const publishedApiHadler = async (previousCourseId) => {
  let token = await localStorage.getItem("auth-token");
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  let requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  const data = await fetch(
    `${baseUrl}/course/${previousCourseId}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
  return data;
};
const deleteCategories = async (categoryID) => {
  let token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  const data = await fetch(`${baseUrl}/tag/${categoryID}`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
  return data;
};

const deleteNote = async (currentNotedId) => {
  let token = await localStorage.getItem("auth-token");
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  let requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };
  const data = await fetch(`${baseUrl}/note/${currentNotedId}`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
  return data;
};
const deleteFlashCard = async (currentFlashCardId) => {
  let token = await localStorage.getItem("auth-token");
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  let requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };
  const data = await fetch(
    `${baseUrl}/flashcard/${currentFlashCardId}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
  return data;
};

const editLevel = async (levelID, edittedValue) => {
  let token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    title: edittedValue,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const data = await fetch(`${baseUrl}/grade-level/${levelID}`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);

  return data;
};

const addLevel = async (level) => {
  let token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    title: level,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const data = await fetch(`${baseUrl}/grade-level`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
  return data;
};

const addLearningObjectivesToChapter = async (
  learningObjective,
  chapterId,
  courseId
) => {
  let token = await localStorage.getItem("auth-token");
  let learningObjectiveValues = {
    title: JSON.stringify(learningObjective),
    chapterId,
    courseId,
  };

  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(learningObjectiveValues),
    redirect: "follow",
  };
  let textEditorURL = `${baseUrl}/lo`;
  const data = await fetch(textEditorURL, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
  return data;
};

const addNoteswithChapters = async ({ e, selectedChapterId, tagIdState }) => {
  let token = await localStorage.getItem("auth-token");
  let desciptionNotesValues = {
    body: JSON.stringify(e),
    chapterId: selectedChapterId,
    tagId: tagIdState,
  };
  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(desciptionNotesValues),
    redirect: "follow",
  };
  let descriptionNotesURL = `${baseUrl}/note`;
  const descriptionNotesURLdata = await fetch(
    descriptionNotesURL,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
  return descriptionNotesURLdata;
};

const addNoteswithSnacks = async ({ e, selectedSnackId, tagIdState }) => {
  let token = await localStorage.getItem("auth-token");
  let desciptionNotesValues = {
    body: JSON.stringify(e),
    snackId: selectedSnackId,
    tagId: tagIdState,
  };
  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(desciptionNotesValues),
    redirect: "follow",
  };
  let descriptionNotesURL = `${baseUrl}/note`;
  const descriptionNotesURLdata = await fetch(
    descriptionNotesURL,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
  return descriptionNotesURLdata;
};

const addFlashCardWithChapter = async ({
  e,
  selectedChapterId,
  tagIdState,
}) => {
  let token = await localStorage.getItem("auth-token");
  const { question, answer } = e;
  let desciptionNotesValues = {
    chapterId: selectedChapterId,
    tagId: tagIdState,
    question: JSON.stringify(question),
    answer: JSON.stringify(answer),
  };
  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(desciptionNotesValues),
    redirect: "follow",
  };
  let descriptionNotesURL = `${baseUrl}/flashcard`;
  const chaptersFlashCard = await fetch(descriptionNotesURL, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
  return chaptersFlashCard;
};

const addFlashCardWithSnacks = async ({ e, selectedSnackId, tagIdState }) => {
  let token = await localStorage.getItem("auth-token");
  const { question, answer } = e;
  let desciptionNotesValues = {
    snackId: selectedSnackId,
    tagId: tagIdState,
    question: JSON.stringify(question),
    answer: JSON.stringify(answer),
  };
  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(desciptionNotesValues),
    redirect: "follow",
  };
  let descriptionNotesURL = `${baseUrl}/flashcard`;
  const snacksFlashCard = await fetch(descriptionNotesURL, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
  return snacksFlashCard;
};

const getLearningObjectivesFromChapter = async (chapterId) => {
  let token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const data = await fetch(
    `${baseUrl}/lo/chapterId/${chapterId}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => error);

  return data;
};
const getLearningObjectivesById = async (learningObjectiveId) => {
  let token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const data = await fetch(
    `${baseUrl}/lo/${learningObjectiveId}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => error);

  return data;
};

const getUnits = async (courseID) => {
  let token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const data = await fetch(`${baseUrl}/unit/${courseID}`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => error);
  return data;
};

const getChapterDetails = async (previousCourseId) => {
  let token = await localStorage.getItem("auth-token");
  let requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log("previousCourseId", previousCourseId);
  let getChaptersURL = `${baseUrl}/course/${previousCourseId}`;
  const data = await fetch(getChaptersURL, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
  return data;
};

const getUserData = async () => {
  const token = await localStorage.getItem("auth-token");

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const data = await fetch(`${baseUrl}/system-user/list`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => error);
  return data;
};

const deleteChapter = async (chapterID) => {
  let token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  const data = await fetch(`${baseUrl}/chapter/${chapterID}`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => error);
  return data;
};

const getLevel = async () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const data = await fetch(`${baseUrl}/grade-level`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      result = JSON.parse(result);
      return result;
    })
    .catch((error) => error);
  return data;
};

const addUnitToCourse = async (unitValue) => {
  let token = await localStorage.getItem("auth-token");
  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(unitValue),
    redirect: "follow",
  };
  let URL = `${baseUrl}/unit`;
  const data = await fetch(URL, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
  return data;
};

const deleteGivenCourse = async (courseID) => {
  let token = await localStorage.getItem("auth-token");

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  const data = await fetch(`${baseUrl}/course/${courseID}`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
  return data;
};

const createCourseStageOne = async (courseValues) => {
  let token = await localStorage.getItem("auth-token");
  let URL = `${baseUrl}/course`;
  const data = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(courseValues),
  })
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);

  return data;
};

const getCoursesList = async () => {
  let token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const data = await fetch(`${baseUrl}/course`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => error);

  return data;
};

const getSingleCourseDetails = async (subjectID, levelID) => {
  let data = await getCoursesList().then((el) => {
    const found = el.data.rows.find(
      (each) =>
        subjectID.id === each.subject.id && each.gradeLevel.id === levelID.id
    );
    return found;
  });
  return data;
};

const addChapterToUnit = async (chapterValues) => {
  let token = await localStorage.getItem("auth-token");
  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(chapterValues),
    redirect: "follow",
  };

  let chapterURL = `${baseUrl}/chapter`;
  const data = await fetch(chapterURL, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
  return data;
};

const getChapterFromUnit = async (unitID) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const data = await fetch(`${baseUrl}/chapter/${unitID}`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => error);
  return data;
};

const getFlashcards = async (id, type) => {
  let token = localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  let url = `${baseUrl}/flashcard/${id}`;

  if (type === "chapter") {
    // url = url + "?chapter=true";
    url = url + "?resource=chapter";
  } else if (type === "snack") {
    url = url + "?resource=snack";
  }
  let data = await fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => JSON.parse(error));
  return data;
};
const getFlashcardsByTagAndChapter = async (ids) => {
  const {chapterId, tagId} = ids
  let token = localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  let url = `${baseUrl}/flashcard/content?chapterId=${chapterId}&tagId=${tagId}`;

  // if (type === "chapter") {
  //   // url = url + "?chapter=true";
  //   url = url + "?resource=chapter";
  // } else if (type === "snack") {
  //   url = url + "?resource=snack";
  // }
  let data = await fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => JSON.parse(error));
  return data;
};

const addChapterToCourse = async (title, courseId) => {
  let token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    title,
    courseId,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const data = await fetch(`${baseUrl}/chapter`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => error);
  return data;
};

const getNotes = async (payload) => {
  let data;
  if (payload.type === "chapter") {
    data = await getNotesAgainstChapter(payload.id, payload.type)
      .then((el) => el)
      .catch((err) => err);
  }
  if (payload.type === "snack") {
    data = await getNotesAgainstSnack(payload.id, payload.type)
      .then((el) => el)
      .catch((err) => err);
  }
  return data;
};
const getNotesAgainstChapter = async (chapterId, type) => {
  let token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const data = await fetch(
    `${baseUrl}/note/snack-id/${chapterId}?resource=${type}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => error);
  return data;
};

const getNotesAgainstSnack = async (snackId, type) => {
  let token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const data = await fetch(
    `${baseUrl}/note/snack-id/${snackId}?resource=${type}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => error);
  return data;
};
const getNotesByCourseAndTag = async (snackId, tagId,type) => {
  let token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  
 if(type === "snack"){
  const data = await fetch(
    `${baseUrl}/tag/contentbysnack?snackId=${snackId}&tagId=${tagId}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => error);
  return data;
 }
 else{
  const data = await fetch(
    `${baseUrl}/tag/contentbychapter?chapterId=${snackId}&tagId=${tagId}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => error);
  return data;
 
 }
};

const deleteSubject = async (subjectID) => {
  let token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  const data = await fetch(`${baseUrl}/subject/${subjectID}`, requestOptions)
    .then((response) => response.json())
    .then((result) => JSON.parse(result))
    .catch((error) => error);
  return data;
};

const deleteLevel = async (subjectID) => {
  let token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  const data = await fetch(
    `${baseUrl}/grade-level//${subjectID}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
  return data;
};

const updateUserProfile = async (payload) => {
  const token = await localStorage.getItem("auth-token");
  let URL = `${baseUrl}/user`;
  const data = await fetch(URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);

  return data;
};

const deleteUser = async (userId, token) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  const data = await fetch(`${baseUrl}/system-user/${userId}`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => error);
  return data;
};

const deleteUnit = async (unitId) => {
  let token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  const data = await fetch(`${baseUrl}/unit/${unitId}`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => error);
  return data;
};

const addSnacksToChapter = async (snackValues) => {
  let token = await localStorage.getItem("auth-token");

  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(snackValues),
    redirect: "follow",
  };

  let url = `${baseUrl}/snack`;
  const data = await fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
  return data;
};

const deleteSnack = async (snackId) => {
  let token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  const data = await fetch(`${baseUrl}/snack/${snackId}`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => error);
  return data;
};

const deleteLearningObjective = async (learningObjectiveId) => {
  let token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  const data = await fetch(
    `${baseUrl}/lo/${learningObjectiveId}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => error);
  return data;
};

const editChapter = async (chapterID, chapterName) => {
  let token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    title: chapterName,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const data = await fetch(
    `${baseUrl}/chapter/${chapterID}?course=true`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));

  return data;
};

const updateLearningObjective = async (updates, learningObjId) => {
  let token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    title: updates,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let data = await fetch(`${baseUrl}/lo/${learningObjId}`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => error);
  return data;
};

const editSnack = async (snackID, snackName) => {
  let token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    title: snackName,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const data = await fetch(`${baseUrl}/snack/${snackID}`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));

  return data;
};

const editUnit = async (unitID, unitName) => {
  let token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    title: unitName,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const data = await fetch(`${baseUrl}/unit/${unitID}`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));

  return data;
};

const editFlashCard = async (flashCardID, payload) => {
  let token = await localStorage.getItem("auth-token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(payload);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const data = await fetch(
    `${baseUrl}/flashcard/${flashCardID}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));

  return data;
};
const api = {
  post: {
    addCategory,
    addSubjects,
    addLevel,
    addLearningObjectivesToChapter,
    createCourse: {
      createCourseStageOne,
      addUnitToCourse,
      addChapterToUnit,
      addNoteswithChapters,
      addNoteswithSnacks,
      addFlashCardWithChapter,
      addFlashCardWithSnacks,
      addChapterToCourse,
      addSnacksToChapter,
    },
  },
  get: {
    getChapterFromUnit,
    getCategories,
    getSubjects,
    getLevel,
    getCoursesList,
    getSingleCourseDetails,
    getLearningObjectivesFromChapter,
    getUnits,
    getChapterDetails,
    allTags,
    getChaptersNotesList,
    getSnackNotes,
    getFlashcards,
    getFlashcardsByTagAndChapter,
    getNotes,
    getUserData,
    getLearningObjectivesById,
    getNotesByCourseAndTag
  },
  put: {
    editCategories,
    editSubject,
    editLevel,
    updateChapterNotes,
    updateSnackNotes,
    publishedApiHadler,
    updateUserProfile,
    editChapter,
    editSnack,
    editUnit,
    updateLearningObjective,
    editFlashCard,
  },
  delete: {
    deleteCategories,
    deleteGivenCourse,
    deleteChapter,
    deleteSubject,
    deleteUnit,
    deleteUser,
    deleteNote,
    deleteFlashCard,
    deleteSnack,
    deleteLearningObjective,
    deleteLevel,
    // deleteCategory
  },
};
export default api;
