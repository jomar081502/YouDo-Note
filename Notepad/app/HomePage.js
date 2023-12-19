import { router } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';

const HomePage = () => {

    //These functions are event handlers associated with the button presses. 
    //They use the router to navigate to different paths within the app.
    const onPressNote = () => {
        router.replace('/Notes'); // Navigate to '/Notes'
    };

    const onPressCustom = () => {
        router.replace('/Addnotes'); // Navigate to '/Addnotes'
    };

    const onPressLogout = () => {
        router.replace('/'); // Navigate to the root '/'
    };

    // Render the component
    return (
        // Use ImageBackground with a background image
        <ImageBackground source={{ uri: 'https://i.pinimg.com/736x/79/89/eb/7989ebaa57a785ca67c8eed56e7fa451.jpg' }}
            style={styles.bG}>
            {/* Main container view with overlay */}
            <View style={styles.overlay}>
                {/* Container for the main content */}
                <View style={styles.homeBody}>
                    {/* Title and tagline */}
                    <View style={styles.title}>
                        <Text style={styles.title1}>YouDo</Text><Text style={styles.title2}> Note</Text>
                    </View>
                    <Text style={styles.tagline}>Organize your thoughts, capture your ideas anytime, anywhere, with your digital notebook, and make a difference.</Text>

                    {/* Container for buttons */}
                    <View style={styles.container}>
                        {/* Container for "NOTES" and "ADD NOTES" buttons */}
                        <View style={styles.btnCon}>
                            {/* Button to navigate to '/Notes' */}
                            <TouchableOpacity onPress={onPressNote} style={styles.notesBtn}>
                                <Text style={styles.notesText}>NOTES</Text>
                            </TouchableOpacity>
                            {/* Button to navigate to '/Addnotes' */}
                            <TouchableOpacity onPress={onPressCustom} style={styles.customBtn}>
                                <Text style={styles.customText}>ADD NOTES</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Button to log out */}
                        <TouchableOpacity onPress={onPressLogout} style={styles.logoutBtn}>
                            <Text style={styles.logoutText}>LOG OUT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    
    bG: {
        flex: 1,
        resizeMode: 'cover'
    },


    homeBody: {
        width: '100%',
        height: '100%',
        justifyContent: 'center', 
        alignItems: 'center',
        top: 50
    },

    container: {
        borderWidth: 10,
        borderColor: '#816579',
        borderRadius:25,
        padding: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop: 250,
    },

    title: {
        position: 'absolute',
        top:70,
        flexDirection: 'row',
    }, 
    
    title1: {
        fontSize: 90,
        color: '#B0578D',
        fontFamily: 'Tahoma',
        fontWeight: '1000',
    },

    title2: {
        fontSize:90,
        color: '#816579',
        fontFamily: 'sans-serif',
        fontWeight: '1000',
    },

    tagline: {
        top:180,
        position:'absolute',
        fontFamily: 'Helvetica',
        fontSize: 17,
        marginTop: 18,
    },

    btnCon:{
        flexDirection: 'row',
        padding:5
    },

    notesBtn: {
        width: 300,
        backgroundColor:"#816579",
        borderRadius:15,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop: 20,
        marginRight: 5
    },

    customBtn: {
        width: 300,
        backgroundColor:"#816579",
        borderRadius:15,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop: 20,
        marginLeft: 5
    },

    logoutBtn: {
        width: 610,
        backgroundColor:"#8D8DAA",
        borderRadius:15,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop: 10,
    },

    customText: {
        color: 'white',
        fontFamily: '',
        fontWeight: 'bold'
    },

    notesText: {
        color: 'white',
        fontWeight: 'bold'
    },

    logoutText: {
        color: 'white',
        fontWeight: 'bold'
    },
});


//exported as the default export of this module, making it available for use in other parts of the application.
export default HomePage;