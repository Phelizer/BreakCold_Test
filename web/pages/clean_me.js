import React from 'react';
import { useRouter } from 'next/router';
import {UserBLoC} from "./users.bloc";
import {UsersService} from "../services/UserService";
import { userStoreInstance } from './stores/UsersStore';

// TODO: wrap this component into observer from 'mobx-react-lite' in order to make it reactive
export default function MessyPage() {
  const router = useRouter();

  // TODO: add IoC container
  const usersService = new UsersService(userStoreInstance);
  const bloc = new UserBLoC(userStoreInstance, usersService);

  return (
    <div style={{ fontFamily: 'Arial', color: 'black', backgroundColor: 'white', padding: '20px' }}>
      <h1 style={{ fontSize: '30px', color: 'blue' }}>Page Title</h1>
      {bloc.loading ? (
        <p>Loading...</p>
      ) : (
        bloc.users && bloc.users?.map((user, i) => (
          <div key={i} style={{ margin: '10px 0', padding: '10px', border: '1px solid black' }}>
            <h2 style={{ fontSize: '25px' }}>{user.title}</h2>
            <p>{user.description}</p>
            {/* TODO: remove inline callbacks */}
            <button
              onClick={() => router.push(`/detail/${user.id}`)}
              style={{ padding: '10px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer' }}
            >
              View Detail
            </button>
          </div>
        ))
      )}
    </div>
  );
}
