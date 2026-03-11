// User credentials and project mappings
const users = {
    'unitedinpride': {
        password: 'pride2026',
        redirectTo: 'unitedinpride/',
        projectName: 'unitedinpride'
    },
    'dhruvil': {
        password: 'admin@dhruvil',
        redirectTo: 'unitedinpride/',
        projectName: 'unitedinpride'
    },
    'newlifeproject': {
        password: 'newlife2026',
        redirectTo: 'newlifeproject/',
        projectName: 'newlifeproject'
    },
    'brenda': {
        password: 'newlife2026',
        redirectTo: 'newlifeproject/',
        projectName: 'newlifeproject'
    },
    'growth91': {
        password: 'growth2026',
        redirectTo: 'growth91/',
        projectName: 'growth91'
    },
    'g91admin': {
        password: 'growth@91',
        redirectTo: 'growth91/',
        projectName: 'growth91'
    },
    'mtsc': {
        password: 'mtsc2026',
        redirectTo: 'mtsc/',
        projectName: 'mtsc'
    },
    'mtscadmin': {
        password: 'seafarers@2026',
        redirectTo: 'mtsc/',
        projectName: 'mtsc'
    },
    // Add more users as needed
    // 'username': { password: 'password', redirectTo: 'project-folder/index.html', projectName: 'Project Name' }
};

/**
 * Login function
 * @param {string} username 
 * @param {string} password 
 * @returns {object} Result object with success status and redirect URL or error message
 */
function login(username, password) {
    const user = users[username];
    
    if (!user) {
        return {
            success: false,
            message: 'Invalid username or password'
        };
    }
    
    if (user.password !== password) {
        return {
            success: false,
            message: 'Invalid username or password'
        };
    }
    
    return {
        success: true,
        redirectTo: user.redirectTo,
        projectName: user.projectName
    };
}