import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { 
      type: String, 
      default: "",
      trim: true,
      maxlength: 50 
    },
    bio: { 
      type: String, 
      default: "",
      trim: true,
      maxlength: 200 
    },
    profileImage: { 
      type: String, 
      default: "",
      validate: {
        validator: function(v) {
          return v === "" || /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
        },
        message: props => `${props.value} is not a valid URL!`
      }
    },
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }],
    // OTP verification fields (kept exactly the same)
    otp: { type: String },
    otpExpiry: { type: Date },
    isVerified: { type: Boolean, default: false },
  },
  { 
    timestamps: true,
    toJSON: {
      transform: function(doc, ret) {
        delete ret.password;
        delete ret.otp;
        delete ret.otpExpiry;
        return ret;
      },
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

// Password hashing (kept exactly the same)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password comparison (kept exactly the same)
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

/* NEW PROFILE-RELATED ADDITIONS */
// Virtual for profile URL
userSchema.virtual('profileURL').get(function() {
  return `/profile/${this._id}`;
});

// Method to get safe profile data
userSchema.methods.getProfileData = function() {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    bio: this.bio,
    profileImage: this.profileImage,
    posts: this.posts,
    createdAt: this.createdAt
  };
};

export default mongoose.model("User", userSchema);