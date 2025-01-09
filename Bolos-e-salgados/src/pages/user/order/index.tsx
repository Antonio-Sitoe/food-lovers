import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import UserLayout from "../../../components/Usercomponents/UserLayout";
import { UserContext } from "../../../Context/UserContext";
import Loading from "../../../Helper/Loading";
import { Order, Subtitle } from "../../../styles/UserStyles";
import nookies from "nookies";
import FetchData from "../../../Helper/FetchData";
import { GET_ORDER, GET_USERDATA } from "../../../services/Api";

interface Idata {
  client_id: number;
  message: string;
  createdAt: string;
  number: number;
  status: string;
  total: string;
}

interface IUserOrderProps {
  data: {
    id: number;
    attributes: Idata;
  }[];
}

const UserOrders = ({ data }: IUserOrderProps) => {
  const { isAuthenticate, loading, user } = React.useContext(UserContext);

  if (loading) return <Loading />;
  if (isAuthenticate)
    return (
      <>
        <Head>
          <title>Pedidos de {user.username}</title>
          <meta name="description" content="Minha conta" />
        </Head>
        <UserLayout>
          <Order>
            <Subtitle>Pedidos recentes</Subtitle>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Pedido</th>
                    <th>Data</th>
                    <th>Status</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length ? (
                    <>
                      {data.map(({ id, attributes }) => {
                        const date = new Date(attributes.createdAt);
                        return (
                          <tr key={id}>
                            <td>#{id}</td>
                            <td>{date.toLocaleDateString()} </td>
                            <td>${attributes.status}</td>
                            <td>{attributes.total}MT</td>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <p>Faca um pedido</p>
                  )}
                </tbody>
              </table>
            </div>
          </Order>
        </UserLayout>
      </>
    );
  return null;
};

export default UserOrders;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = nookies.get(ctx);

  const ORDEROPTIONS = GET_ORDER(token);
  const getUser = GET_USERDATA(token);
  const response = await FetchData(ORDEROPTIONS);
  const user = await FetchData(getUser);

  if (!response) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const data = response.data.filter(({ attributes }) => {
    return attributes.client_id === user.id;
  });
  return {
    props: {
      data,
    },
  };
};
