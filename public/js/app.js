import axios from 'axios';
import Swal from 'sweetalert2';

const skillsSet = new Set();

const getCsrfToken = () => {
    return document.querySelector('meta[name="csrf_token"]').content;
}

document.addEventListener('DOMContentLoaded', () => {
    const skills = document.querySelector('.skill-list');
    if (skills) {
        skills.addEventListener('click', addSkills);
        skillsSelected();
    }

    let alerts = document.querySelector('.alerts');
    if(alerts) {
        clearAlerts();
    }

    const jobOfferList = document.querySelector('.panel-grid');
    if(jobOfferList){
        jobOfferList.addEventListener('click', actionsGrid);
    }

    const logout = document.getElementById('deleteLink');
    if (logout) {
        logout.addEventListener('click', actionLogout);
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

    document.querySelector('#skills').value = [...skillsSet];
};

const skillsSelected = () => {
    const selected = Array.from(document.querySelectorAll('.skill-list .active') );

    selected.forEach(select => {
        skillsSet.add(select.textContent);
    })

    document.querySelector('#skills').value = [...skillsSet];
};

const clearAlerts = () => {
    const alerts = document.querySelector('.alerts');
    const interval = setInterval(() => {
        if(alerts.children.length > 0 ) {
            alerts.removeChild(alerts.children[0]);
        } else if (alerts.children.length === 0 ) {
            alerts.parentElement.removeChild(alerts);
            clearInterval(interval);
        }
    }, 4000);
};

const actionsGrid = e => {
    e.preventDefault();

    if(e.target.dataset.delete){
        //Delete through axios
        Swal.fire({
            title: 'Confirm Delete?',
            text: "The data will be removed from the database",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText : 'Cancel'
        }).then((result) => {
            if (result.value) {
                //Send request through axios
                const url = `${location.origin}/job-offer/delete/${e.target.dataset.delete}`;

                // Axios to delete data
                axios.delete(url, {params: {url}, headers: {'X-CSRF-TOKEN': getCsrfToken()}})
                    .then(function(response) {
                        if(response.status === 200) {
                            Swal.fire(
                                'Deleted',
                                response.data,
                                'success'
                            );

                            //Remove from DOM
                            e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
                        }
                    })
                    .catch(() => {
                        Swal.fire({
                            type:'error',
                            title: 'There was a error',
                            text: 'Could not delete'
                        });
                    });
            }
        });
    }  else if(e.target.tagName === 'A') {
        window.location.href = e.target.href;
    }
};

const actionLogout = e => {
    e.preventDefault();

    //Delete through axios
    Swal.fire({
        title: 'Confirm Logout?',
        text: "You will be close session",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText : 'Cancel'
    }).then((result) => {
        if (result.value) {
            //Send request through axios
            const url = `${location.origin}/login/delete`;

            console.log(getCsrfToken());
            // Axios to delete data
            axios.delete(url, {params: {url}, headers: {'X-CSRF-TOKEN': getCsrfToken()}})
                .then(function(response) {
                    if(response.status === 200) {
                        window.location.href = response.data.url;
                    }
                })
                .catch(() => {
                    Swal.fire({
                        type:'error',
                        title: 'There was a error',
                        text: 'Could not logout'
                    });
                });
        }
    });
};