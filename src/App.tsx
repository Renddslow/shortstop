// Login
// Dashboard
// Touchbase page
// Profile page (Matt view)
// Training plan/onboarding plan
// Banding/Laddering
// Quarterly conversation
// Team planning
import { h } from 'preact';
import { setup, styled } from 'goober';
import { Route, Link } from 'wouter-preact';

import Touchbase from './Touchbase';

setup(h);

const Wrapper = styled('div')`
  display: block;
  width: 100%;
  margin: 0 auto;
  position: relative;
  background: #fafafa;
  height: 100%;
`;

const App = () => {
  // Dynamically create routes based on permissions
  return (
    <Wrapper>
      <Route path="/">
        <div>
          <ul>
            <li>
              <Link to="/touchbases">Touchbases</Link>
            </li>
          </ul>
        </div>
      </Route>
      <Route path="/touchbases">Touchbases</Route>
      <Route path="/touchbases/:userId" component={Touchbase} />
      <Route path="/people">People</Route>
      <Route path="/people/:userId">People</Route>
    </Wrapper>
  );
};

export default App;
