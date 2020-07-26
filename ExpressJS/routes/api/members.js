const express = require('express');
const uuid = require('uuid');
let members = require('../../members');
const router = express.Router();


//  Get All Members
router.get('/', (req, res) => res.json(members));

//  Get Single Member
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const isFound = members.some((member) => member.id === parseInt(id));
  if (isFound) {
    const member = members.filter(member => member.id === parseInt(id));
    return res.json(member);
  }
  return res.status(400).json({ msg: `Member with id of ${id} not found` });

});

//  Create Member
router.post('/', (req, res) => {
  //  Need Body Parse Middleware
  // res.json(req.body);
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ msg: 'Please Include the name and email of member' });
  }
  const newMember = {
    id: uuid.v4(),
    name: name,
    email: email,
    status: 'active',
  };
  members.push(newMember);
  return res.json(members);


});

//  Update Member
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const isFound = members.some((member) => member.id === parseInt(id));
  if (isFound) {
    members.forEach((member) => {
      if (member.id === parseInt(id)) {
        member.name = name ? name : member.name;
        member.email = email ? email : member.email;
      }
    });
    return res.json({ msg: `member with id:${id} Updated` }, members);
  }
  return res.status(400).json({ msg: `Member with id of ${id} not found` });

});
module.exports = router;

//  Delete Member
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const isFound = members.some((member) => member.id === parseInt(id));
  if (isFound) {
    members = members.filter((member) => member.id !== parseInt(id));
    return res.json({ msg: `member with id:${id} deleted`, members });
  }
  return res.status(400).json({ msg: `Member with id of ${id} not found` });
});
