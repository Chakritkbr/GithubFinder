import React, { useEffect, Fragment, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { Repos } from '../repos/Repos';
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

const User = (
  {
    // user: {
    //   name,
    //   hireable,
    //   avatar_url,
    //   location,
    //   bio,
    //   html_url,
    //   company,
    //   blog,
    //   followers,
    //   following,
    //   public_gists,
    //   public_repos,
    // },
  }
) => {
  const githubContext = useContext(GithubContext);
  const { user, loading, getUser, repos, getUserRepos } = githubContext;

  const {
    name,
    hireable,
    avatar_url,
    location,
    bio,
    html_url,
    company,
    blog,
    followers,
    following,
    public_gists,
    public_repos,
  } = user;

  const { login } = useParams();

  useEffect(() => {
    getUser(login);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getUserRepos(login);
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back To Search
      </Link>
      Hireable:{' '}
      {hireable ? (
        <i className='fas fa-check text-success' />
      ) : (
        <i className='fas fa-times-circle text-danger' />
      )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={avatar_url}
            className='round-img'
            alt=''
            style={{ width: '150px' }}
          />
          <h1>{name}</h1>
          <p>Location:{location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className='btn btn-dark my-1'>
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username: </strong>
                  {login}
                </Fragment>
              )}
            </li>

            <li>
              {company && (
                <Fragment>
                  <strong>Company: </strong>
                  {company}
                </Fragment>
              )}
            </li>

            <li>
              {blog && (
                <Fragment>
                  <strong>Website: </strong>
                  {blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Followers: {followers}</div>
        <div className='badge badge-success'>Following: {following}</div>
        <div className='badge badge-light'>Public Repos: {public_repos}</div>
        <div className='badge badge-dark'>Public GIsts: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

export default User;

// export class User extends Component {
//     componentDidMount() {
//       this.props.getUser(this.props.match.params.login);
//     }

//     render() {
//       const {
//         name,
//         avatar_url,
//         location,
//         bio,
//         blog,
//         login,
//         html_url,
//         followers,
//         following,
//         public_repos,
//         public_gists,
//         hireable,
//       } = this.props.user;

//       const { loading } = this.props;

//       return <div>{name}</div>;
//     }
//   }
