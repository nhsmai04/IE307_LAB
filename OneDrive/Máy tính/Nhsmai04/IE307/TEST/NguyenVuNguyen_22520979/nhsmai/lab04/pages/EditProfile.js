import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { AppContext } from '../Contexts/AppContext';

export default function EditProfile({ route, navigation }) {
    const { dataUserApp } = route.params; // Nhận dữ liệu từ màn hình Profile
    const { updateDataUser } = useContext(AppContext); // Truy cập updateDataUser từ context

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        phone: '',
        address: {
            number: '',
            street: '',
            city: '',
        },
    });

    useEffect(() => {
        if (dataUserApp) {
            setFormData({
                firstname: dataUserApp.name.firstname,
                lastname: dataUserApp.name.lastname,
                username: dataUserApp.username,
                email: dataUserApp.email,
                phone: dataUserApp.phone,
                address: {
                    number: dataUserApp.address.number,
                    street: dataUserApp.address.street,
                    city: dataUserApp.address.city,
                },
            });
        }
    }, [dataUserApp]);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleAddressChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [field]: value,
            },
        }));
    };

    const handleSave = () => {
        console.log('Updated Data:', formData);

        // Cập nhật dữ liệu người dùng trong AppContext
        updateDataUser({
            name: {
                firstname: formData.firstname,
                lastname: formData.lastname,
            },
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
            address: {
                number: formData.address.number,
                street: formData.address.street,
                city: formData.address.city,
            },
        });

        // Quay lại màn hình Profile với dữ liệu đã cập nhật
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Edit Profile</Text>

            <View style={styles.row}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.firstname}
                        onChangeText={(text) => handleInputChange('firstname', text)}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.lastname}
                        onChangeText={(text) => handleInputChange('lastname', text)}
                    />
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={formData.username}
                    onChangeText={(text) => handleInputChange('username', text)}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={formData.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                    keyboardType="email-address"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    value={formData.phone}
                    onChangeText={(text) => handleInputChange('phone', text)}
                    keyboardType="phone-pad"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>House Number</Text>
                <TextInput
                    style={styles.input}
                    value={formData.address.number}
                    onChangeText={(text) => handleAddressChange('number', text)}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Street</Text>
                <TextInput
                    style={styles.input}
                    value={formData.address.street}
                    onChangeText={(text) => handleAddressChange('street', text)}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>City</Text>
                <TextInput
                    style={styles.input}
                    value={formData.address.city}
                    onChangeText={(text) => handleAddressChange('city', text)}
                />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputGroup: {
        marginBottom: 15,
        flex: 1,
        marginRight: 10,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    saveButton: {
        marginTop: 20,
        paddingVertical: 15,
        backgroundColor: 'blue',
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
