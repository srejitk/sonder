import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  Textarea,
  Box,
  Avatar,
  Icon,
  AvatarBadge,
} from "@chakra-ui/react";
import { validationMessages } from "constants";
import {BsFillCameraFill} from "react-icons/bs";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "services/userServices";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";

const EditProfile = ({ isOpen, onClose, btnRef }) => {
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { firstName, lastName, profileImg, portfolioUrl, bio } = userData;
  const [imageUrl, setImageUrl] = useState(profileImg);
  console.log(imageUrl);
  const formik = useFormik({
    initialValues: {
      firstName: firstName ?? "",
      lastName: lastName ?? "",
      portfolioUrl: portfolioUrl ?? "",
      bio: bio ?? "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstName: Yup.string().required(validationMessages.userNameEmpty),
      lastName: Yup.string().required(validationMessages.userNameEmpty),
    }),
    onSubmit: (values, actions) => {
      const { firstName, lastName, portfolioUrl, bio } = values;   
      dispatch(editUser({firstName, lastName, portfolioUrl, bio}))
      actions.resetForm();
    },
  });

  const uploadImage = async (image) => {
    if (Math.round(image.size / 1024000) > 2)
			console.log("Image cannot exceed 2mb");
      //the below code needs to be fixed later
		// else {
    //   console.log("the image is ", image);
		// 	const data1 = new FormData();
    //   console.log(image);
		// 	data1.append("file", image);
		// 	data1.append("upload_preset", process.env.REACT_APP_CLOUDINARY_API_KEY);
    //   data1.append("cloud_name","coldpigli");
    //   console.log("before try", data1);
    //   try{
    //     console.log('is this running ?')
    //     console.log('data1', data1);
    //     const res = await axios.post("https://api.cloudinary.com/v1_1/coldpigli/image/upload",data1);
    //     console.log(res);
    //   }catch(err){
    //     console.log(err);
    //   }
		// }
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size="xl"
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent bg="#21242D" color="white">
        <Box as="form" onSubmit={formik.handleSubmit}>
          <DrawerCloseButton />
          <DrawerHeader>Edit your profile</DrawerHeader>

          <DrawerBody>
            <VStack align="stretch">
            <FormControl>
              <Avatar src={imageUrl} size='2xl' name={`${firstName} ${lastName}`}>
                <AvatarBadge border="0">
                <FormControl>
											<FormLabel
												cursor="pointer"
												position="absolute"
												right="0px"
												bottom="0"
											>
												<Icon as={BsFillCameraFill} w='10' h='10'/>
											</FormLabel>
											<Input
												type="file"
												visibility="hidden"
												accept="image/*"
												onChange={(e) => uploadImage(e.target.files[0])}
											/>
										</FormControl> 
                  
                </AvatarBadge>
              </Avatar>
              </FormControl>

              <FormControl
                isInvalid={formik.errors.firstName && formik.touched.firstName}
              >
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input
                  id="firstName"
                  type="text"
                  {...formik.getFieldProps("firstName")}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={formik.errors.lastName && formik.touched.lastName}
              >
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input
                  id="lastName"
                  type="text"
                  {...formik.getFieldProps("lastName")}
                />
                <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.errors.bio && formik.touched.bio}>
                <FormLabel htmlFor="bio">Bio</FormLabel>
                <Textarea
                  id="bio"
                  type="text"
                  {...formik.getFieldProps("bio")}
                />
                <FormErrorMessage>{formik.errors.bio}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={
                  formik.errors.portfolioUrl && formik.touched.portfolioUrl
                }
              >
                <FormLabel htmlFor="portfolioUrl">Portfolio</FormLabel>
                <Input
                  id="portfolioUrl"
                  type="url"
                  {...formik.getFieldProps("portfolioUrl")}
                />
                <FormErrorMessage>
                  {formik.errors.portfolioUrl}
                </FormErrorMessage>
              </FormControl>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit">
              Save
            </Button>
          </DrawerFooter>
        </Box>
      </DrawerContent>
    </Drawer>
  );
};

export default EditProfile;
