const skillsSet = new Set();

document.addEventListener('DOMContentLoaded', () => {
    const skills = document.querySelector('.skill-list');
    if (skills) {
        skills.addEventListener('click', addSkills);
        skillsSelected();
    }
});

const addSkills = (e) => {
    if (e.target.tagName === 'LI') {
        if (e.target.classList.contains('active')) {
            skillsSet.delete(e.target.textContent);
            e.target.classList.remove('active');
        } else {
            skillsSet.add(e.target.textContent);
            e.target.classList.add('active');
        }
    }

    const skillsArray = [...skillsSet]
    document.querySelector('#skills').value = skillsArray;
};

const skillsSelected = () => {
    const selected = Array.from(document.querySelectorAll('.skill-list .active') );

    selected.forEach(select => {
        skillsSet.add(select.textContent);
    })

    const skillsArray = [...skillsSet]
    document.querySelector('#skills').value = skillsArray;
}
