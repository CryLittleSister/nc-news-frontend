import Header from "../components/Header";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import renderer from "react-test-renderer";
import { setCurrentUser, logout } from "../App";

Enzyme.configure({ adapter: new Adapter() });

describe("header", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("works", () => {
    const wrap = shallow(<Header />);
    expect(wrap.find(".link").text()).toEqual("<Link />");
  });
});

// describe("UserBar", () => {
//   it("works", () => {
//     const wrapper = shallow(
//       <UserBar
//         setCurrentUser={setCurrentUser}
//         logout={logout}
//         currentUser={{}}
//         users={[
//           {
//             _id: "5b51e048b1c4f04c170429dc",
//             username: "tickle122",
//             name: "Tom Tickle",
//             avatar_url:
//               "https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg",
//             __v: 0
//           }
//         ]}
//       />
//     );
//     expect(wrapper.text()).toBe("tara");
//   });
// });
