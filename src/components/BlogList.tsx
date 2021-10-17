import React, { FC, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/fb";
import { Table } from "antd";
import firebase from "firebase/compat";
import dayjs from "dayjs";

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

  const columns = [
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "작성자",
      dataIndex: "writer",
      key: "writer",
    },
    {
      title: "작성일",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];
  console.log(blogs);
  if (isLoading) return <div>loading...</div>;
  return <>{!!blogs && <Table columns={columns} dataSource={blogs} />}</>;
};

export default BlogList;
