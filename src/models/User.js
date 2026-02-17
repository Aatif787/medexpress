import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [50, 'Name must be less than 50 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    mobile: {
        type: String,
        required: [true, 'Mobile number is required'],
        unique: true,
        trim: true,
        match: [/^\d{10}$/, 'Please provide a valid 10-digit mobile number'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
    },
    address: {
        type: String,
        default: '',
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    resetOTP: {
        type: String,
        default: null,
    },
    otpExpire: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
});

UserSchema.index({ email: 1 });
UserSchema.index({ mobile: 1 });

export default mongoose.models.User || mongoose.model('User', UserSchema);
