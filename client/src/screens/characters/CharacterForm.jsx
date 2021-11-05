import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { newCharacter, editCharacter, getCharacter } from "../../services";