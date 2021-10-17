import React, { FC, useContext, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/fb";
import { List, Avatar } from "antd";
import firebase from "firebase/compat";
import dayjs from "dayjs";
import { AuthContext } from "../context/AuthContext";

// import QuerySnapshot = firebase.firestore.QuerySnapshot;
type DocumentData = Partial<firebase.firestore.DocumentData>;
const BlogList: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [blogs, setBlogs] = useState<DocumentData[] | null>(null);
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const citiesRef = collection(db, "blog");
        const q = query(citiesRef, where("enabled", "==", true));
        const querySnapshot = await getDocs(q);
        let arr: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          const docItem = doc.data();
          // console.log(doc.id, " => ", docItem);
          arr.push({
            ...docItem,
            createdAt: dayjs(docItem.createdAt.toDate()).format("YYYY-MM-DD"),
          });
        });
        setBlogs(arr);
      } catch (e: any) {
        console.dir(e.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  console.log(blogs);
  const user = useContext(AuthContext);
  if (isLoading) return <div>loading...</div>;
  // return <>{!!blogs && <Table columns={columns} dataSource={blogs} />}</>;
  return (
    <>
      {!!blogs && (
        <List
          itemLayout="horizontal"
          dataSource={blogs}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={user?.photoURL} />}
                title={<a href="https://ant.design">{item.title}</a>}
                description={item.content}
              />
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default BlogList;
