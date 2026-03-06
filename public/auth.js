// User credentials and project mappings
const users = {
    'unitedinpride': {
        password: 'pride2026',
        redirectTo: 'unitedinpride/index.html',
        projectName: 'United in Pride'
    },
    'client1': {
        password: 'demo123',
        redirectTo: 'unitedinpride/index.html',
        projectName: 'United in Pride'
    }
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