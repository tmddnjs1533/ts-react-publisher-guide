import React, { FC, useCallback, useEffect, useState } from "react";
import { Tabs, Radio, Row, Col, Button, Input } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { database } from "../firebase/fb";
import { ref, set, child, get } from "firebase/database";
const { TabPane } = Tabs;

interface Project {
  code: string;
  name: string;
}

const Catalog: FC = () => {
  const [project, setProject] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isForm, setIsForm] = useState(false);
  const [newProjectCode, setNewProjectCode] = useState("");
  const [newProjectName, setNewProjectName] = useState("");
  const handleProjectChange = useCallback((e) => {
    setProject(e.target.value);
  }, []);
  const handleModeChange = useCallback(() => {
    setIsForm((prev) => !prev);
  }, []);
  const handleNewProjectCodeChange = useCallback((e) => {
    setNewProjectCode(e.target.value);
  }, []);
  const handleNewProjectNameChange = useCallback((e) => {
    setNewProjectName(e.target.value);
  }, []);
  const handleNewProjectSubmit = useCallback(async () => {
    /*const docRef = await addDoc(collection(db, `catalog`, newProjectName), {
      name: newProjectName,
    });*/
    set(ref(database, "catalog/" + newProjectCode), {
      code: newProjectCode,
      name: newProjectName,
    })
      .then(() => {
        setNewProjectCode("");
        setNewProjectName("");
        setIsForm(false);
      })
      .catch((error) => {
        console.dir(error.message);
      });
  }, [newProjectCode, newProjectName]);

  function getProjectData() {
    const dbRef = ref(database);
    get(child(dbRef, `catalog/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const obj: { [code: string]: Project } = snapshot.val();
          let arr = [];
          for (const [key, value] of Object.entries(obj)) {
            console.log(`${key}: ${value}`);
            arr.push({
              code: key,
              name: value.name,
            });
          }
          setProjects(arr);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getProjectData();
  }, []);

  return (
    <div>
      <Row>
        <Radio.Group
          onChange={handleProjectChange}
          value={project}
          style={{ marginBottom: 8 }}
        >
          {/*<Radio.Button value="top">Horizontal</Radio.Button>*/}
          {projects?.map((prj) => (
            <Radio.Button key={prj.code} value={prj.code}>
              {prj.name}
            </Radio.Button>
          ))}
        </Radio.Group>

        <Button
          type={isForm ? "primary" : "default"}
          icon={<PlusSquareOutlined />}
          onClick={handleModeChange}
        >
          Add Project
        </Button>
        {isForm && (
          <>
            <Col>
              <Input
                placeholder="Project Code"
                value={newProjectCode}
                onChange={handleNewProjectCodeChange}
              />
            </Col>
            <Col>
              <Input
                placeholder="Project Name"
                value={newProjectName}
                onChange={handleNewProjectNameChange}
              />
            </Col>
            <Col>
              <Button
                icon={<PlusSquareOutlined />}
                onClick={handleNewProjectSubmit}
              />
            </Col>
          </>
        )}
      </Row>
      <Tabs defaultActiveKey="1" tabPosition="left" style={{ height: 220 }}>
        {[...Array.from({ length: 30 }, (v, i) => i)].map((i) => (
          <TabPane tab={`Tab-${i}`} key={i} disabled={i === 28}>
            Content of tab {i}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default Catalog;
